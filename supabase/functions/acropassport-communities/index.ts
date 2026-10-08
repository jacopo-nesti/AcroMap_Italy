// Publication rules supplied by the owner after the manual Supabase audit.
// status is canonical: archived_at must not introduce a second publication rule.
type Row = Record<string, unknown>
type PublicLocation = {
  city: string
  region: string | null
  coordinates: { lat: number; lng: number } | null
}
type Filter = readonly [string, string | boolean | readonly string[]]
type ReadSpec = { table: string; fields: string; order: string[]; filters?: Filter[] }
type Page = { data: Row[] | null; count: number | null; error: unknown }
type Query = PromiseLike<Page> & {
  select(fields: string, options: { count: "exact" }): Query
  eq(column: string, value: string | boolean): Query
  in(column: string, values: readonly string[]): Query
  order(column: string, options: { ascending: boolean }): Query
  range(from: number, to: number): Query
}
export type DatabaseClient = { from(table: string): Query }
export type FeedData = Record<string, Row[]>

const CONTACT_TYPES = ["website", "instagram", "facebook"] as const
const ACTIVE: Filter[] = [["status", "active"]]
const BATCH_SIZE = 500
// No select('*'), administrative tables, protected-contact RPCs, or write queries.
const READS: ReadSpec[] = [
  { table: "groups", fields: "id,name,description,status,updated_at", order: ["id"], filters: ACTIVE },
  { table: "courses", fields: "id,group_id,name,teachers,day,start_time,end_time,location,maps_url,level,season,season_notes,notes,status,updated_at", order: ["id"], filters: ACTIVE },
  { table: "jams", fields: "id,type,day,start_time,end_time,location,maps_url,season,season_notes,notes,status,updated_at", order: ["id"], filters: ACTIVE },
  { table: "contacts", fields: "id,type,label,value,status,is_protected", order: ["id"], filters: [...ACTIVE, ["is_protected", false], ["type", CONTACT_TYPES]] },
  { table: "cities", fields: "id,region_id,name,lat,lng", order: ["id"] },
  { table: "regions", fields: "id,name", order: ["id"] },
  { table: "city_communities", fields: "city_id,community_id", order: ["city_id", "community_id"] },
  { table: "community_groups", fields: "community_id,group_id", order: ["community_id", "group_id"] },
  { table: "community_courses", fields: "community_id,course_id", order: ["community_id", "course_id"] },
  { table: "community_jams", fields: "community_id,jam_id", order: ["community_id", "jam_id"] },
  { table: "group_jams", fields: "group_id,jam_id,status", order: ["group_id", "jam_id"], filters: [["status", "accepted"]] },
  { table: "group_contacts", fields: "group_id,contact_id,sort_order", order: ["group_id", "contact_id"] },
  { table: "course_contacts", fields: "course_id,contact_id,sort_order", order: ["course_id", "contact_id"] },
  { table: "jam_contacts", fields: "jam_id,contact_id,sort_order", order: ["jam_id", "contact_id"] },
]

async function readAll(client: DatabaseClient, spec: ReadSpec): Promise<Row[]> {
  const rows: Row[] = []
  let expected: number | undefined
  const seen = new Set<string>()

  do {
    let query = client.from(spec.table).select(spec.fields, { count: "exact" })

    for (const [column, value] of spec.filters ?? []) {
      query = typeof value === "object"
        ? query.in(column, value)
        : query.eq(column, value)
    }

    for (const column of spec.order) {
      query = query.order(column, { ascending: true })
    }

    const { data, count, error } = await query.range(
      rows.length,
      rows.length + BATCH_SIZE - 1,
    )

    if (
      error ||
      !Array.isArray(data) ||
      count === null ||
      !Number.isSafeInteger(count) ||
      count < 0
    ) {
      throw new Error("Incomplete database read")
    }

    if (expected !== undefined && count !== expected) {
      throw new Error("Dataset changed during read")
    }

    expected = count

    if (
      rows.length + data.length > count ||
      (data.length === 0 && rows.length < count)
    ) {
      throw new Error("Incomplete database read")
    }

    for (const row of data) {
      const key = JSON.stringify(
        spec.order.map((column) => row[column]),
      )

      if (seen.has(key)) {
        throw new Error("Unstable database read")
      }

      seen.add(key)
      rows.push(row)
    }

    // Advance by rows actually received: the server's max_rows may be < BATCH_SIZE.
  } while (rows.length < expected)

  return rows
}

export async function loadFeedData(client: DatabaseClient): Promise<FeedData> {
  return Object.fromEntries(
    await Promise.all(
      READS.map(async (spec) => [spec.table, await readAll(client, spec)]),
    ),
  )
}

function id(row: Row, column = "id"): number {
  const value = row[column]
  if (typeof value !== "number" || !Number.isSafeInteger(value)) throw new Error("Invalid identifier")
  return value
}

function string(value: unknown): string | null {
  return typeof value === "string" ? value : null
}

// Free-text fields are public UI fields, but may accidentally contain direct
// contact details. Omit the entire affected field instead of exporting those details.
function publicText(value: unknown): string | null {
  const text = string(value)
  if (text === null) return null
  if (/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(text) || /(?:\+?\d[\s().-]*){9,}/.test(text)
    || /(?:mailto:|tel:|sms:|whatsapp:|signal:|wa\.me\/|whatsapp\.com\/|signal\.me\/|t\.me\/)/i.test(text)) return null
  return text
}

function webUrl(value: unknown): string | null {
  if (typeof value !== "string" || [...value].some((character) => character.charCodeAt(0) <= 32 || character.charCodeAt(0) === 127)) return null
  try {
    const url = new URL(value)
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null
    // The type whitelist must not be defeated by a mislabeled messaging/reveal URL.
    const blocked = ["wa.me", "whatsapp.com", "signal.me", "signal.group", "t.me", "telegram.me", "telegram.org", "youtube.com", "youtu.be", "x.com", "twitter.com"]
    if (blocked.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))) return null
    const decoded = decodeURIComponent(value)
    if (/reveal-protected-contact|[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(decoded)) return null
    if ([...url.searchParams.keys()].some((key) => /^(?:token|access_token|api_key|apikey|secret|password|email|phone)$/i.test(key))) return null
    return value
  } catch {
    return null
  }
}

function contactUrl(contact: Row): string | null {
  if (contact.status !== "active" || contact.is_protected !== false
    || !CONTACT_TYPES.some((type) => type === contact.type)) return null
  return webUrl(contact.value)
}

function index(rows: Row[]): Map<number, Row> {
  return new Map(rows.map((row) => [id(row), row]))
}

function links(rows: Row[], from: string, to: string): Map<number, Set<number>> {
  const result = new Map<number, Set<number>>()
  for (const row of rows) {
    const key = id(row, from)
    if (!result.has(key)) result.set(key, new Set())
    result.get(key)!.add(id(row, to))
  }
  return result
}

function intersects(left: Set<number>, right?: Set<number>): boolean {
  return right !== undefined && [...left].some((value) => right.has(value))
}

function sorted(rows: Row[]): Row[] {
  return [...index(rows).values()].sort((a, b) => id(a) - id(b))
}

function season(value: unknown): string | null {
  return ["summer", "winter", "all-year"].includes(value as string) ? value as string : null
}

function time(value: unknown): string | null {
  return typeof value === "string" && /^\d{2}:\d{2}/.test(value) ? value.slice(0, 5) : null
}

export function buildFeed(data: FeedData, generatedAt: string) {
  const cities = index(data.cities)
  const regions = index(data.regions)
  const citiesByTerritory = links(data.city_communities, "community_id", "city_id")
  const territoriesByGroup = links(data.community_groups, "group_id", "community_id")
  const territoriesByCourse = links(data.community_courses, "course_id", "community_id")
  const territoriesByJam = links(data.community_jams, "jam_id", "community_id")
  const acceptedJams = links(data.group_jams.filter((row) => row.status === "accepted"), "group_id", "jam_id")
  const contacts = index(data.contacts.filter((row) => contactUrl(row) !== null))
  const courses = sorted(data.courses.filter((row) => row.status === "active"))
  const jams = sorted(data.jams.filter((row) => row.status === "active"))

  function publicContacts(table: string, key: string, entityId: number): Row[] {
    return data[table].filter((row) => row[key] === entityId)
      .sort((a, b) => Number(a.sort_order) - Number(b.sort_order) || id(a, "contact_id") - id(b, "contact_id"))
      .map((row) => contacts.get(id(row, "contact_id")))
      .filter((contact): contact is Row => contact !== undefined)
  }

  const communities = sorted(data.groups.filter((row) => row.status === "active")).map((group) => {
    const groupId = id(group)
    // Match the site's territorial associations, considering every linked city.
    const territories = new Set([...(territoriesByGroup.get(groupId) ?? [])]
      .filter((territory) => [...(citiesByTerritory.get(territory) ?? [])].some((cityId) => cities.has(cityId))))
    const cityIds = new Set([...territories].flatMap((territory) => [...(citiesByTerritory.get(territory) ?? [])])
      .filter((cityId) => cities.has(cityId)))
    // Keep one group per id, and expose every distinct linked city in stable id order.
    const locationEntries: { regionId: number | null; location: PublicLocation }[] = []
    for (const cityId of [...cityIds].sort((a, b) => a - b)) {
      const city = cities.get(cityId)
      if (!city) continue
      const cityName = publicText(city.name)
      if (cityName === null) continue
      const regionId = typeof city.region_id === "number" && Number.isSafeInteger(city.region_id)
        ? city.region_id : null
      const region = regionId === null ? undefined : regions.get(regionId)
      locationEntries.push({
        regionId,
        location: {
          city: cityName,
          region: region ? publicText(region.name) : null,
          coordinates: typeof city.lat === "number" && typeof city.lng === "number"
            && Number.isFinite(city.lat) && Number.isFinite(city.lng)
            ? { lat: city.lat, lng: city.lng } : null,
        },
      })
    }
    const locations = locationEntries.map(({ location }) => location)
    const singleLocation = cityIds.size === 1 ? locations[0] : undefined
    const sharedRegion = cityIds.size > 1 && locationEntries.length === cityIds.size
      && locationEntries[0].regionId !== null && locationEntries[0].location.region !== null
      && locationEntries.every(({ regionId }) => regionId === locationEntries[0].regionId)
      ? locationEntries[0].location.region : null
    const groupContacts = publicContacts("group_contacts", "group_id", groupId)
    const groupUrl = (type: string) => {
      const contact = groupContacts.find((row) => row.type === type)
      return contact ? contactUrl(contact) : null
    }
    return {
      id: groupId,
      name: publicText(group.name),
      description: publicText(group.description),
      city: singleLocation?.city ?? null,
      region: singleLocation?.region ?? sharedRegion,
      coordinates: singleLocation?.coordinates ?? null,
      locations,
      website: groupUrl("website"),
      instagram: groupUrl("instagram"),
      facebook: groupUrl("facebook"),
      updated_at: string(group.updated_at),
      courses: courses.filter((course) => course.group_id === groupId && intersects(territories, territoriesByCourse.get(id(course))))
        .map((course) => {
          const contact = publicContacts("course_contacts", "course_id", id(course))[0]
          const courseSeason = season(course.season)
          return {
            id: id(course),
            name: publicText(course.name),
            teachers: Array.isArray(course.teachers) ? course.teachers.map(publicText).filter((name): name is string => name !== null) : [],
            day: publicText(course.day),
            start_time: time(course.start_time),
            end_time: time(course.end_time),
            location: publicText(course.location),
            maps_url: webUrl(course.maps_url),
            level: publicText(course.level),
            season: courseSeason,
            season_notes: courseSeason ? publicText(course.season_notes) : null,
            notes: publicText(course.notes),
            contact: contact ? { type: contact.type as string, label: publicText(contact.label), url: contactUrl(contact) } : null,
            updated_at: string(course.updated_at),
          }
        }),
      jams: jams.filter((jam) => acceptedJams.get(groupId)?.has(id(jam)) && intersects(territories, territoriesByJam.get(id(jam))))
        .map((jam) => {
          const variable = jam.type === "variable"
          const contact = variable ? publicContacts("jam_contacts", "jam_id", id(jam))[0] : undefined
          const jamSeason = season(jam.season)
          return {
            id: id(jam),
            type: publicText(jam.type),
            day: variable ? null : publicText(jam.day),
            start_time: variable ? null : time(jam.start_time),
            end_time: variable ? null : time(jam.end_time),
            location: variable ? null : publicText(jam.location),
            maps_url: variable ? null : webUrl(jam.maps_url),
            season: jamSeason,
            season_notes: jamSeason ? publicText(jam.season_notes) : null,
            notes: publicText(jam.notes),
            updates_method: contact ? contact.type as string : null,
            updates_url: contact ? contactUrl(contact) : null,
            updated_at: string(jam.updated_at),
          }
        }),
    }
  })
  return { version: "1.0", generated_at: generatedAt, communities }
}

function json(body: unknown, status: number, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers },
  })
}

async function sameToken(actual: string, expected: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const [left, right] = await Promise.all([actual, expected].map(async (token) =>
    new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(token)))))
  let difference = 0
  for (let i = 0; i < left.length; i++) difference |= left[i] ^ right[i]
  return difference === 0
}

export function createHandler(dependencies: {
  getEnv: (name: string) => string | undefined
  loadData: () => Promise<FeedData>
  now?: () => Date
}) {
  return async (request: Request): Promise<Response> => {
    if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405, { Allow: "GET" })
    const authorization = request.headers.get("Authorization") ?? ""
    const match = authorization.length <= 4096 ? /^Bearer ([^\s]+)$/i.exec(authorization) : null
    if (!match) return json({ error: "unauthorized" }, 401)
    try {
      const expected = dependencies.getEnv("ACROPASSPORT_API_TOKEN")
      if (!expected) return json({ error: "service_unavailable" }, 503)
      if (!await sameToken(match[1], expected)) return json({ error: "unauthorized" }, 401)
      const data = await dependencies.loadData()
      return json(buildFeed(data, (dependencies.now?.() ?? new Date()).toISOString()), 200)
    } catch {
      // Never serialize Supabase errors, credentials, query details, or partial data.
      return json({ error: "feed_unavailable" }, 500)
    }
  }
}

// Importing this module in offline tests neither starts a server nor reads secrets.
if (import.meta.main) {
  Deno.serve(createHandler({
    getEnv: (name) => Deno.env.get(name),
    loadData: async () => {
      const url = Deno.env.get("SUPABASE_URL")
      const keys = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") ?? "{}")
      if (!url || typeof keys.default !== "string" || !keys.default) throw new Error("Missing server configuration")
      const { createClient } = await import("npm:@supabase/supabase-js@2.116.0")
      const client = createClient(url, keys.default, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      })
      return loadFeedData(client as unknown as DatabaseClient)
    },
  }))
}

import test from "node:test"
import assert from "node:assert/strict"
import { randomBytes } from "node:crypto"
import { readFile } from "node:fs/promises"
import { createClient } from "@supabase/supabase-js"
import { buildFeed, createHandler, loadFeedData } from "../supabase/functions/acropassport-communities/index.ts"

// Ephemeral mock credentials only: no real or hardcoded integration token.
const mockToken = randomBytes(32).toString("base64url")
const mockDatabaseKey = randomBytes(32).toString("base64url")
const timestamp = "2026-01-01T00:00:00.000Z"
const generated = "2026-10-04T12:00:00.000Z"
const admin = { moderation_note: "ADMIN_ONLY", email: "PRIVATE_EMAIL_MARKER", token: "PRIVATE_TOKEN_MARKER", role: "ADMIN_ROLE_MARKER", private_notes: "PRIVATE_NOTE_MARKER", tally: "TALLY_MARKER" }

function fixture() {
  return {
    groups: [
      { id: 1, name: "Example group", description: "Public description", status: "active", updated_at: timestamp, ...admin },
      { id: 2, name: "Second group", description: null, status: "active", updated_at: timestamp },
      ...["pending", "archived", "rejected"].map((status, i) => ({ id: i + 3, name: "HIDDEN_GROUP", status })),
    ],
    cities: [{ id: 10, name: "Example city", region_id: 100, lat: 43.5, lng: 11.5 }],
    regions: [{ id: 100, name: "Example region" }],
    city_communities: [{ city_id: 10, community_id: 20 }, { city_id: 10, community_id: 21 }],
    community_groups: [{ community_id: 20, group_id: 1 }, { community_id: 21, group_id: 1 }, { community_id: 20, group_id: 2 }, { community_id: 20, group_id: 3 }],
    courses: [
      { id: 30, group_id: 1, status: "active", name: "Example course", teachers: ["Example teacher"], day: "monday", start_time: "18:30:00", end_time: "20:00:00", location: "Example gym", maps_url: "https://example.test/map", level: "mixed", season: "all-year", season_notes: "Public season note", notes: "Public course note", updated_at: timestamp, description: "UNSHOWN_DESCRIPTION", frequency: "UNSHOWN_FREQUENCY", ...admin },
      { id: 31, group_id: 1, status: "pending", name: "HIDDEN_COURSE" },
      { id: 32, group_id: 3, status: "active", name: "HIDDEN_PARENT_COURSE" },
      { id: 33, group_id: 1, status: "active", name: "UNLINKED_COURSE" },
      { id: 34, group_id: 1, status: "archived", name: "ARCHIVED_COURSE" },
    ],
    community_courses: [30, 31, 32, 34].map((course_id) => ({ course_id, community_id: 20 })),
    jams: [
      { id: 40, type: "variable", status: "active", day: "HIDDEN_VARIABLE_DAY", start_time: "11:00:00", end_time: "12:00:00", location: "HIDDEN_VARIABLE_LOCATION", maps_url: "https://example.test/hidden-map", season: "summer", season_notes: "Summer note", notes: "Public jam note", updated_at: timestamp, name: "UNSHOWN_JAM_NAME", ...admin },
      { id: 41, type: "regular", status: "active", day: "sunday", start_time: "11:00:00", end_time: "12:00:00", location: "Example park", maps_url: "https://example.test/park", season: "unknown", season_notes: "UNSHOWN_SEASON_NOTE", updated_at: timestamp },
      { id: 42, type: "regular", status: "pending" },
      { id: 43, type: "regular", status: "active" },
      { id: 44, type: "regular", status: "active" },
      { id: 45, type: "regular", status: "active" },
      { id: 46, type: "regular", status: "archived" },
    ],
    community_jams: [40, 41, 42, 43, 45, 46].map((jam_id) => ({ jam_id, community_id: 20 })).concat({ jam_id: 40, community_id: 21 }),
    group_jams: [
      ...[40, 41, 42, 44, 46].map((jam_id) => ({ jam_id, group_id: 1, status: "accepted" })),
      { jam_id: 40, group_id: 2, status: "accepted" },
      { jam_id: 43, group_id: 1, status: "pending" },
      { jam_id: 45, group_id: 1, status: "rejected" },
    ],
    contacts: [
      { id: 50, type: "website", value: "https://example.test/group", label: "Public website", status: "active", is_protected: false, ...admin },
      { id: 51, type: "instagram", value: "https://www.instagram.com/example", label: "Public updates", status: "active", is_protected: false },
      { id: 52, type: "facebook", value: "https://www.facebook.com/example", label: null, status: "active", is_protected: false },
      { id: 53, type: "website", value: "PROTECTED_MARKER", status: "active", is_protected: true },
      { id: 54, type: "website", value: "INACTIVE_CONTACT_MARKER", status: "archived", is_protected: false },
      ...["whatsapp", "phone", "email", "telegram", "youtube", "x", "other", "signal", "Signal", "future_type"].map((type, i) => ({ id: 60 + i, type, value: `https://example.test/FORBIDDEN_${type}`, status: "active", is_protected: false })),
    ],
    group_contacts: [53, 54, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 50, 51, 52].map((contact_id, sort_order) => ({ group_id: 1, contact_id, sort_order })),
    course_contacts: [53, 60, 50].map((contact_id, sort_order) => ({ course_id: 30, contact_id, sort_order })),
    jam_contacts: [{ jam_id: 40, contact_id: 51, sort_order: 0 }, { jam_id: 41, contact_id: 52, sort_order: 0 }],
  }
}

// Real supabase-js query construction, intercepted entirely in memory. No network.
function database(data, { cap = 2, rewrite = (page) => page } = {}) {
  const requests = []
  const client = createClient("https://example.test", mockDatabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      fetch: async (input, init) => {
        const url = new URL(input)
        const table = url.pathname.split("/").at(-1)
        assert.ok(Object.hasOwn(data, table), "Only whitelisted tables may be read")
        assert.equal(init.method, "GET")
        const headers = new Headers(init.headers)
        assert.match(headers.get("Prefer"), /count=exact/)
        const fields = url.searchParams.get("select").split(",")
        assert.ok(!fields.includes("*"))
        let rows = data[table].filter((row) => [...url.searchParams].every(([key, filter]) => {
          if (filter.startsWith("eq.")) return String(row[key]) === filter.slice(3)
          if (filter.startsWith("in.(")) return filter.slice(4, -1).split(",").includes(String(row[key]))
          return true
        }))
        const order = url.searchParams.get("order").split(",").map((entry) => {
          assert.ok(entry.endsWith(".asc"))
          return entry.slice(0, -4)
        })
        rows = rows.toSorted((a, b) => {
          for (const key of order) if (a[key] !== b[key]) return a[key] - b[key]
          return 0
        })
        const offset = Number(url.searchParams.get("offset"))
        const limit = Number(url.searchParams.get("limit"))
        assert.ok(Number.isInteger(offset) && limit > 0)
        requests.push({ table, fields, order, offset, limit, parameters: Object.fromEntries(url.searchParams) })
        const page = rewrite({
          table, offset, count: rows.length,
          rows: rows.slice(offset, offset + Math.min(limit, cap)).map((row) => Object.fromEntries(fields.map((key) => [key, row[key] ?? null]))),
        })
        if (page.error) return new Response(JSON.stringify({ message: page.error }), { status: 500, headers: { "Content-Type": "application/json" } })
        const last = offset + page.rows.length - 1
        return new Response(JSON.stringify(page.rows), {
          status: 200,
          headers: { "Content-Type": "application/json", "Content-Range": `${page.rows.length ? `${offset}-${last}` : "*"}/${page.count ?? "*"}` },
        })
      },
    },
  })
  return { client, requests }
}

function handler(loadData = async () => fixture(), env = () => mockToken) {
  return createHandler({ getEnv: env, loadData, now: () => new Date(generated) })
}

function request(method = "GET", token = mockToken) {
  return new Request("https://example.test/functions/v1/acropassport-communities", {
    method,
    headers: token === null ? {} : { Authorization: `Bearer ${token}` },
  })
}

test("missing, malformed and incorrect Bearer are 401; no database access", async () => {
  let reads = 0
  const run = handler(async () => { reads++; throw new Error("Must not read") })
  for (const authorization of [null, "", "Basic invalid", "Bearer", "Bearer a b", `Bearer ${randomBytes(24).toString("hex")}`]) {
    const response = await run(new Request("https://example.test", { headers: authorization === null ? {} : { Authorization: authorization } }))
    assert.equal(response.status, 401)
    assert.deepEqual(await response.json(), { error: "unauthorized" })
  }
  assert.equal(reads, 0)
})

test("all non-GET methods are 405 with JSON, Allow: GET, and no CORS", async () => {
  const run = handler(async () => { throw new Error("Must not read") })
  for (const method of ["POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"]) {
    const response = await run(request(method, null))
    assert.equal(response.status, 405)
    assert.equal(response.headers.get("Allow"), "GET")
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), null)
    assert.deepEqual(await response.json(), { error: "method_not_allowed" })
  }
})

test("correct ephemeral Bearer returns 200 through SDK reads and explicit whitelists", async () => {
  const db = database(fixture())
  const response = await handler(() => loadFeedData(db.client))(request())
  assert.equal(response.status, 200)
  assert.match(response.headers.get("Content-Type"), /application\/json/)
  assert.equal(response.headers.get("Cache-Control"), "no-store")
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), null)
  const body = await response.json()
  assert.deepEqual(Object.keys(body), ["version", "generated_at", "communities"])
  assert.equal(body.version, "1.0")
  assert.equal(body.generated_at, generated)
  assert.deepEqual(body.communities.map((group) => group.id), [1, 2])
  const group = body.communities[0]
  assert.deepEqual(Object.keys(group), ["id", "name", "description", "city", "region", "coordinates", "locations", "website", "instagram", "facebook", "updated_at", "courses", "jams"])
  assert.equal(group.city, "Example city")
  assert.deepEqual(group.coordinates, { lat: 43.5, lng: 11.5 })
  assert.deepEqual(group.locations, [{ city: "Example city", region: "Example region", coordinates: { lat: 43.5, lng: 11.5 } }])
  assert.equal(group.website, "https://example.test/group")
  assert.equal(group.instagram, "https://www.instagram.com/example")
  assert.equal(group.facebook, "https://www.facebook.com/example")
  assert.equal(group.updated_at, timestamp)
  assert.deepEqual(group.courses.map((course) => course.id), [30])
  assert.deepEqual(Object.keys(group.courses[0]), ["id", "name", "teachers", "day", "start_time", "end_time", "location", "maps_url", "level", "season", "season_notes", "notes", "contact", "updated_at"])
  assert.equal(group.courses[0].start_time, "18:30")
  assert.deepEqual(group.courses[0].contact, { type: "website", label: "Public website", url: "https://example.test/group" })
  assert.deepEqual(group.jams.map((jam) => jam.id), [40, 41])
  assert.deepEqual(Object.keys(group.jams[0]), ["id", "type", "day", "start_time", "end_time", "location", "maps_url", "season", "season_notes", "notes", "updates_method", "updates_url", "updated_at"])
  assert.equal(group.jams[0].location, null)
  assert.equal(group.jams[0].start_time, null)
  assert.equal(group.jams[0].updates_method, "instagram")
  assert.equal(group.jams[0].updates_url, "https://www.instagram.com/example")
  assert.equal(group.jams[1].location, "Example park")
  assert.equal(group.jams[1].updates_url, null)
  assert.equal(group.jams[1].season_notes, null)
  assert.equal(group.courses[0].updated_at, timestamp)
  assert.equal(group.jams[0].updated_at, timestamp)
  const serialized = JSON.stringify(body)
  assert.doesNotMatch(serialized, /HIDDEN_|UNSHOWN_|UNLINKED_|ARCHIVED_|PROTECTED_|FORBIDDEN_|PRIVATE_|ADMIN_|TALLY_|INACTIVE_/)
  assert.equal(serialized.includes(mockToken), false)
  assert.equal(serialized.includes(mockDatabaseKey), false)
  for (const call of db.requests) {
    if (["groups", "courses", "jams", "contacts"].includes(call.table)) assert.equal(call.parameters.status, "eq.active")
    if (call.table === "contacts") {
      assert.equal(call.parameters.is_protected, "eq.false")
      assert.equal(call.parameters.type, "in.(website,instagram,facebook)")
    }
    if (call.table === "group_jams") assert.equal(call.parameters.status, "eq.accepted")
  }
})

test("serializer independently excludes unpublished/protected/unknown types even if supplied by the reader", () => {
  const body = buildFeed(fixture(), generated)
  const serialized = JSON.stringify(body)
  assert.doesNotMatch(serialized, /PROTECTED_|FORBIDDEN_|INACTIVE_|HIDDEN_|ARCHIVED_/)
  assert.deepEqual(body.communities.map((group) => group.id), [1, 2])
  assert.deepEqual(body.communities[0].courses.map((course) => course.id), [30])
  assert.deepEqual(body.communities[0].jams.map((jam) => jam.id), [40, 41])
})

test("jam shared across groups keeps its original id once per group, despite multiple territories", () => {
  const data = fixture()
  data.group_jams.push({ group_id: 1, jam_id: 40, status: "accepted" })
  data.jams.push({ ...data.jams[0] })
  data.community_jams.push({ community_id: 20, jam_id: 40 })
  const body = buildFeed(data, generated)
  assert.equal(body.communities[0].jams.filter((jam) => jam.id === 40).length, 1)
  assert.equal(body.communities[1].jams.filter((jam) => jam.id === 40).length, 1)
  assert.deepEqual(body.communities[0].jams[0], body.communities[1].jams[0])
})

test("status remains canonical even if archived_at is inconsistent; administrative timestamps stay private", () => {
  const data = fixture()
  for (const table of ["groups", "courses", "jams", "contacts"]) {
    data[table][0].archived_at = timestamp
    data[table][0].last_verified_at = timestamp
  }
  const body = buildFeed(data, generated)
  assert.equal(body.communities[0].id, 1)
  assert.equal(body.communities[0].courses[0].id, 30)
  assert.equal(body.communities[0].jams[0].id, 40)
  assert.equal(body.communities[0].website, "https://example.test/group")
  assert.doesNotMatch(JSON.stringify(body), /archived_at|last_verified_at/)
})

test("one linked city retains top-level geography and appears in locations", () => {
  const group = buildFeed(fixture(), generated).communities[0]
  assert.equal(group.city, "Example city")
  assert.equal(group.region, "Example region")
  assert.deepEqual(group.coordinates, { lat: 43.5, lng: 11.5 })
  assert.deepEqual(group.locations, [{ city: group.city, region: group.region, coordinates: group.coordinates }])
})

test("two linked cities in the same region preserve only the shared top-level region", () => {
  const data = fixture()
  data.cities.push({ id: 11, name: "Another city", region_id: 100, lat: 44, lng: 12 })
  data.city_communities.push({ city_id: 11, community_id: 21 })
  const group = buildFeed(data, generated).communities[0]
  assert.equal(group.city, null)
  assert.equal(group.region, "Example region")
  assert.equal(group.coordinates, null)
  assert.deepEqual(group.locations, [
    { city: "Example city", region: "Example region", coordinates: { lat: 43.5, lng: 11.5 } },
    { city: "Another city", region: "Example region", coordinates: { lat: 44, lng: 12 } },
  ])
})

test("cities from different regions have no top-level geography", () => {
  const data = fixture()
  data.regions.push({ id: 101, name: "Other region" })
  data.cities.push({ id: 11, name: "Another city", region_id: 101, lat: 44, lng: 12 })
  data.city_communities.push({ city_id: 11, community_id: 21 })
  const group = buildFeed(data, generated).communities[0]
  assert.equal(group.city, null)
  assert.equal(group.region, null)
  assert.equal(group.coordinates, null)
  assert.deepEqual(group.locations, [
    { city: "Example city", region: "Example region", coordinates: { lat: 43.5, lng: 11.5 } },
    { city: "Another city", region: "Other region", coordinates: { lat: 44, lng: 12 } },
  ])
})

test("a group linked to multiple cities is serialized only once", () => {
  const data = fixture()
  data.cities.push({ id: 11, name: "Another city", region_id: 100, lat: 44, lng: 12 })
  data.city_communities.push({ city_id: 11, community_id: 21 })
  const groups = buildFeed(data, generated).communities
  assert.deepEqual(groups.map((group) => group.id), [1, 2])
  assert.equal(groups[0].locations.length, 2)
})

test("locations deduplicate city ids across territories and retain stable id order", () => {
  const data = fixture()
  data.cities.push({ id: 12, name: "Third city", region_id: 100, lat: null, lng: null })
  data.cities.push({ id: 11, name: "Another city", region_id: 100, lat: 44, lng: 12 })
  data.city_communities.push({ city_id: 12, community_id: 20 })
  data.city_communities.push({ city_id: 11, community_id: 21 })
  data.city_communities.push({ city_id: 11, community_id: 20 })
  const group = buildFeed(data, generated).communities[0]
  assert.deepEqual(group.locations.map((location) => location.city), ["Example city", "Another city", "Third city"])
  assert.deepEqual(group.locations[2], { city: "Third city", region: "Example region", coordinates: null })
  assert.equal(group.locations.length, 3)
  assert.equal(group.city, null)
})

test("a group without cities has no invented geography", () => {
  const data = fixture()
  data.groups.push({ id: 9, name: "No city", status: "active", updated_at: timestamp })
  const body = buildFeed(data, generated)
  assert.deepEqual(body.communities.map((group) => group.id), [1, 2, 9])
  assert.equal(body.communities[2].city, null)
  assert.equal(body.communities[2].region, null)
  assert.equal(body.communities[2].coordinates, null)
  assert.deepEqual(body.communities[2].locations, [])
})

test("mislabeled contact URLs and recognizable direct contact details in public text are omitted", () => {
  for (const value of ["tel:+000000000000", "mailto:sample@example.test", "https://wa.me/000000000000", "https://signal.me/example", "https://t.me/example", "https://youtube.com/example", "https://x.com/example", "https://user:pass@example.test", "https://example.test/functions/v1/reveal-protected-contact", "https://example.test/?token=synthetic", "javascript:alert(1)"]) {
    const data = fixture()
    data.contacts[0].value = value
    assert.equal(buildFeed(data, generated).communities[0].website, null)
  }
  const data = fixture()
  data.groups[0].description = "Reach sample@example.test"
  data.courses[0].notes = "Contact +00 000 000 0000"
  data.jams[0].notes = "Join https://wa.me/000000000000"
  const group = buildFeed(data, generated).communities[0]
  assert.equal(group.description, null)
  assert.equal(group.courses[0].notes, null)
  assert.equal(group.jams[0].notes, null)
})

test("full feed reads beyond 1000 rows even when server cap is below requested batch size", async () => {
  const data = fixture()
  data.groups = Array.from({ length: 1253 }, (_, i) => ({ id: i + 1, name: `Synthetic group ${i + 1}`, status: "active", updated_at: timestamp }))
  const db = database(data, { cap: 37 })
  const response = await handler(() => loadFeedData(db.client))(request())
  assert.equal(response.status, 200)
  const body = await response.json()
  assert.equal(body.communities.length, 1253)
  assert.deepEqual(body.communities.map((group) => group.id), data.groups.map((group) => group.id))
  const pages = db.requests.filter((call) => call.table === "groups")
  assert.equal(pages.length, Math.ceil(1253 / 37))
  assert.equal(pages[1].offset, 37)
  assert.equal(pages.at(-1).offset, 1221)
  assert.ok(pages.every((call) => call.limit === 500))
})

test("empty tables produce an empty feed, not an error or missing keys", async () => {
  const data = Object.fromEntries(Object.keys(fixture()).map((table) => [table, []]))
  const db = database(data)
  const response = await handler(() => loadFeedData(db.client))(request())
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { version: "1.0", generated_at: generated, communities: [] })
  assert.equal(db.requests.length, 14)
})

test("missing counts, changing totals, repeated pages and prematurely empty pages fail closed", async () => {
  for (const rewrite of [
    (page) => ({ ...page, count: null }),
    (page) => page.offset > 0 ? { ...page, count: page.count + 1 } : page,
    (page) => page.offset > 0 ? { ...page, rows: [] } : page,
    (page) => page.table === "groups" && page.offset > 0 ? { ...page, rows: [{ id: 1, name: "Repeated", status: "active" }] } : page,
  ]) {
    const db = database(fixture(), { cap: 1, rewrite })
    const response = await handler(() => loadFeedData(db.client))(request())
    assert.equal(response.status, 500)
    assert.deepEqual(await response.json(), { error: "feed_unavailable" })
  }
})

test("database errors never return partial feed, secret, stack, or query details", async () => {
  const db = database(fixture(), {
    cap: 1,
    rewrite: (page) => page.table === "groups" && page.offset > 0
      ? { ...page, error: `INTERNAL_SQL_DETAIL ${mockToken} ${mockDatabaseKey}` } : page,
  })
  const response = await handler(() => loadFeedData(db.client))(request())
  assert.equal(response.status, 500)
  assert.deepEqual(await response.json(), { error: "feed_unavailable" })
  const missing = await handler(async () => { throw new Error("Must not read") }, () => undefined)(request())
  assert.equal(missing.status, 503)
  assert.deepEqual(await missing.json(), { error: "service_unavailable" })
})

test("JWT opt-out is confined to the new function and production token has no code fallback", async () => {
  const config = await readFile(new URL("../supabase/config.toml", import.meta.url), "utf8")
  const section = config.match(/\[functions\.acropassport-communities\]([^[]*)/)
  assert.ok(section)
  assert.match(section[1], /verify_jwt\s*=\s*false/)
  assert.equal((config.match(/^verify_jwt\s*=/gm) ?? []).length, 1)
  const source = await readFile(new URL("../supabase/functions/acropassport-communities/index.ts", import.meta.url), "utf8")
  assert.doesNotMatch(source, /console\.|\.rpc\(|\.insert\(|\.update\(|\.delete\(/)
  assert.match(source, /getEnv\("ACROPASSPORT_API_TOKEN"\)/)
})

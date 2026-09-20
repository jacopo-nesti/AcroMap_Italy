import fs from "fs"
import path from "path"
import { fileURLToPath } from "node:url"
import { loadEnv } from "vite"
import { createClient } from "@supabase/supabase-js"

const projectRoot = fileURLToPath(new URL("../", import.meta.url))
const distDir = path.join(projectRoot, "dist")
const indexPath = path.join(distDir, "index.html")

const SITE_URL = "https://acrofinder.it"

const indexHtml = fs.readFileSync(indexPath, "utf8")

async function loadSeoMetadata() {
  const env = loadEnv("production", projectRoot, "VITE_SUPABASE_")
  const required = ["VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"]
  const missing = required.filter((name) => !env[name]?.trim())
  if (missing.length) throw new Error(`Variabili ambiente mancanti: ${missing.join(", ")}`)

  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })

  // Anonymous reads respect the same public RLS as the frontend. Never select
  // contacts, courses, descriptions or the complete legacy data structure.
  async function readRows(table, columns, orderColumns, acceptedOnly = false) {
    const rows = []
    const pageSize = 500
    for (let offset = 0; ; offset += pageSize) {
      let query = supabase.from(table).select(columns, { count: "exact" })
      for (const column of orderColumns) query = query.order(column)
      if (acceptedOnly) query = query.eq("status", "accepted")
      const { data, error, count } = await query.range(offset, offset + pageSize - 1)
        .abortSignal(AbortSignal.timeout(30000))
      if (error || !Array.isArray(data) || count === null) {
        throw new Error(`Lettura metadata SEO da ${table} fallita. Verificare connessione, configurazione e policy pubbliche.`)
      }
      rows.push(...data)
      if (rows.length >= count) return rows
      // Fail rather than silently omit pages if the API row cap is too low.
      if (data.length < pageSize) throw new Error(`Risposta incompleta da ${table}: verificare il limite righe dell'API.`)
    }
  }

  const [cities, regions, cityCommunities, communityGroups, groups, communityJams, jams, groupJams] = await Promise.all([
    readRows("cities", "id,slug,name,region_id", ["id"]),
    readRows("regions", "id,name", ["id"]),
    readRows("city_communities", "city_id,community_id", ["city_id", "community_id"]),
    readRows("community_groups", "community_id,group_id", ["community_id", "group_id"]),
    readRows("groups", "id", ["id"]),
    readRows("community_jams", "community_id,jam_id", ["community_id", "jam_id"]),
    readRows("jams", "id", ["id"]),
    readRows("group_jams", "group_id,jam_id", ["group_id", "jam_id"], true),
  ])
  if (!cities.length) throw new Error("Nessuna città pubblica restituita da Supabase: generazione SEO interrotta.")
  const citySlugs = new Set()
  for (const city of cities) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(city.slug) || !city.name?.trim() || citySlugs.has(city.slug)) {
      throw new Error("Metadata città non validi o slug duplicati: generazione SEO interrotta.")
    }
    citySlugs.add(city.slug)
  }

  const publicGroupIds = new Set(groups.map((group) => group.id))
  const publicJamIds = new Set(jams.map((jam) => jam.id))
  const acceptedPairs = new Set(groupJams.map((relation) => `${relation.group_id}:${relation.jam_id}`))
  const communitiesWithJams = new Set(communityJams.filter((relation) =>
    publicJamIds.has(relation.jam_id) && communityGroups.some((membership) =>
      membership.community_id === relation.community_id && publicGroupIds.has(membership.group_id)
      && acceptedPairs.has(`${membership.group_id}:${relation.jam_id}`)
    )
  ).map((relation) => relation.community_id))
  const cityIdsWithJams = new Set(cityCommunities.filter((relation) =>
    communitiesWithJams.has(relation.community_id)
  ).map((relation) => relation.city_id))
  const regionNames = new Map(regions.map((region) => [region.id, region.name]))
  const jamRegions = new Set()
  for (const city of cities) {
    if (!cityIdsWithJams.has(city.id)) continue
    const name = regionNames.get(city.region_id)
    if (!name?.trim()) throw new Error("Regione pubblica mancante per una città con jam: generazione SEO interrotta.")
    jamRegions.add(name)
  }
  return { cities, jamRegions }
}

const { cities, jamRegions } = await loadSeoMetadata().catch((error) => {
  console.error(`Generazione SEO fallita: ${error.message}`)
  process.exit(1)
})

function createSlug(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
}

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function createPage(route, title, description) {
  const canonical = `${SITE_URL}${route}`

  let html = indexHtml

  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  )

  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(description)}" />`
  )

  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  )

  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  )

  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonical}" />`
  )

  if (/<link\s+rel="canonical"/i.test(html)) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonical}" />`
    )
  } else {
    html = html.replace(
      "</head>",
      `  <link rel="canonical" href="${canonical}" />\n  </head>`
    )
  }

  const relativeRoute = route.replace(/^\/|\/$/g, "")
  const outputDir = path.join(distDir, relativeRoute)

  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(path.join(outputDir, "index.html"), html)

  console.log(`✓ Generated ${route}`)
}

// 404 fallback per GitHub Pages
fs.copyFileSync(indexPath, path.join(distDir, "404.html"))
console.log("✓ Generated /404.html")

const staticPages = [
  {
    route: "/community",
    title: "Community di Acroyoga in Italia | AcroFinder",
    description:
      "Esplora le community di Acroyoga in Italia organizzate per regione e città.",
  },
  {
    route: "/map",
    title: "Mappa Acroyoga Italia | AcroFinder",
    description:
      "Esplora sulla mappa le città e le community di Acroyoga presenti in Italia.",
  },
  {
    route: "/guide",
    title: "Guida all'Acroyoga | AcroFinder",
    description:
      "Informazioni utili per iniziare, partecipare alle jam e vivere la community in modo sicuro, consapevole e rispettoso.",
  },
  {
    route: "/aboutus",
    title: "Chi siamo | AcroFinder",
    description:
      "Scopri AcroFinder, il progetto che raccoglie community, jam e corsi di Acroyoga in Italia.",
  },
  {
    route: "/contribute",
    title: "Contribuisci ad AcroFinder",
    description:
      "Segnala una community, una jam, un corso o un aggiornamento e contribuisci a mantenere AcroFinder aggiornato.",
  },
  {
    route: "/contactus",
    title: "Contatti | AcroFinder",
    description:
      "Contatta AcroFinder per informazioni, segnalazioni o suggerimenti sul progetto.",
  },
  {
  route: "/privacy",
  title: "Privacy Policy | AcroFinder",
  description:
    "Consulta l'informativa sulla privacy di AcroFinder.",
  },
  {
    route: "/terms",
    title: "Termini di utilizzo | AcroFinder",
    description:
      "Consulta i termini di utilizzo di AcroFinder.",
  },
]

const urls = [
  `${SITE_URL}/`,
]

// pagine statiche
for (const page of staticPages) {
  createPage(page.route, page.title, page.description)
  urls.push(`${SITE_URL}${page.route}`)
}

// pagine città
for (const city of cities) {
  const route = `/city/${city.slug}`

  createPage(
    route,
    `Acroyoga a ${city.name} | Community, Jam e Corsi | AcroFinder`,
    `Scopri le community di Acroyoga a ${city.name}, le jam e i corsi disponibili.`
  )

  urls.push(`${SITE_URL}${route}`)
}

// regioni con almeno una jam
for (const regionName of jamRegions) {
  const regionSlug = createSlug(regionName)
  const route = `/region/${regionSlug}/jams`

  createPage(
    route,
    `Jam di Acroyoga in ${regionName} | AcroFinder`,
    `Scopri tutte le jam di Acroyoga disponibili in ${regionName}, con città, dettagli e community di riferimento.`
  )

  urls.push(`${SITE_URL}${route}`)
}

// sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap)

console.log(`✓ Generated sitemap.xml with ${urls.length} URLs`)

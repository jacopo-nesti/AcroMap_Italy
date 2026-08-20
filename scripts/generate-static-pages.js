import fs from "fs"
import path from "path"

const distDir = path.resolve("dist")
const indexPath = path.join(distDir, "index.html")
const citiesPath = path.resolve("public/data/cities.json")

const SITE_URL = "https://acrofinder.it"

const indexHtml = fs.readFileSync(indexPath, "utf8")
const cities = JSON.parse(fs.readFileSync(citiesPath, "utf8"))

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
const regions = new Map()

for (const city of cities) {
  if (!regions.has(city.region)) {
    regions.set(city.region, [])
  }

  regions.get(city.region).push(city)
}

for (const [regionName, regionCities] of regions) {
  const totalJams = regionCities.reduce((total, city) => {
    return (
      total +
      (city.communities || []).reduce(
        (communityTotal, community) =>
          communityTotal + (community.jams?.length || 0),
        0
      )
    )
  }, 0)

  if (totalJams === 0) continue

  const regionSlug = createSlug(regionName)
  const route = `/region/${regionSlug}/jams`

  createPage(
    route,
    `Jam di Acroyoga in ${regionName} | AcroFinder`,
    `Scopri tutte le jam di Acroyoga disponibili in ${regionName}, con città, orari, luoghi e community.`
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
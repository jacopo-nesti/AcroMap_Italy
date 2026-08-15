export const regionIcons = {
  Campania: "bi-sun",
  "Emilia-Romagna": "bi-building",
  "Friuli-Venezia Giulia": "bi-gem",
  Lazio: "bi-bank",
  Liguria: "bi-water",
  Lombardia: "bi-buildings",
  Piemonte: "bi-compass",
  Puglia: "bi-tree",
  Sardegna: "bi-wind",
  Sicilia: "bi-map",
  Toscana: "bi-tree",
  "Trentino-Alto Adige": "bi-compass",
  Umbria: "bi-house",
  Veneto: "bi-building",
}

export const regionArticles = {
  Campania: "la ",
  "Emilia-Romagna": "l'",
  "Friuli-Venezia Giulia": "il ",
  Lazio: "il ",
  Liguria: "la ",
  Lombardia: "la ",
  Piemonte: "il ",
  Puglia: "la ",
  Sardegna: "la ",
  Sicilia: "la ",
  Toscana: "la ",
  "Trentino-Alto Adige": "il ",
  Umbria: "l'",
  Veneto: "il ",
}

export function getRegionIcon(regionName) {
  return regionIcons[regionName] || "bi-geo-alt"
}

export function getRegionArticle(regionName) {
  return regionArticles[regionName] || "la "
}

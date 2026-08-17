export const regionIcons = {
  Abruzzo: "bi-mountain",
  Basilicata: "bi-tree",
  Calabria: "bi-water",
  Campania: "bi-sun",
  "Emilia-Romagna": "bi-building",
  "Friuli-Venezia Giulia": "bi-gem",
  Lazio: "bi-bank",
  Liguria: "bi-water",
  Lombardia: "bi-buildings",
  Marche: "bi-water",
  Molise: "bi-tree",
  Piemonte: "bi-compass",
  Puglia: "bi-tree",
  Sardegna: "bi-wind",
  Sicilia: "bi-map",
  Toscana: "bi-tree",
  "Trentino-Alto Adige": "bi-compass",
  Umbria: "bi-house",
  "Valle d'Aosta": "bi-mountain",
  Veneto: "bi-building",
}

export const regionArticles = {
  Abruzzo: "l'",
  Basilicata: "la ",
  Calabria: "la ",
  Campania: "la ",
  "Emilia-Romagna": "l'",
  "Friuli-Venezia Giulia": "il ",
  Lazio: "il ",
  Liguria: "la ",
  Lombardia: "la ",
  Marche: "le ",
  Molise: "il ",
  Piemonte: "il ",
  Puglia: "la ",
  Sardegna: "la ",
  Sicilia: "la ",
  Toscana: "la ",
  "Trentino-Alto Adige": "il ",
  Umbria: "l'",
  "Valle d'Aosta": "la ",
  Veneto: "il ",
}

export function getRegionIcon(regionName) {
  return regionIcons[regionName] || "bi-geo-alt"
}

export function getRegionArticle(regionName) {
  return regionArticles[regionName] || "la "
}
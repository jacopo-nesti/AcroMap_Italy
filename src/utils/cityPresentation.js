const CITY_CATEGORIES = {
  modern: ["milano", "torino"],
  historic: ["firenze", "roma", "bergamo", "san-miniato", "verona", "perugia"],
  cultural: ["pisa", "bologna", "padova"],
  coast: ["livorno", "napoli", "genova", "bari", "trieste", "catania", "palermo", "cagliari"],
  mountain: ["bolzano"],
}

const CATEGORY_ICONS = {
  modern: "bi-building",
  historic: "bi-buildings",
  cultural: "bi-bank",
  coast: "bi-water",
  mountain: "bi-triangle",
  fallback: "bi-geo-alt",
}

export function getCityIcon(city) {
  const cityKey = city?.slug?.toLowerCase() || city?.name?.toLowerCase().replaceAll(" ", "-")
  const category = Object.entries(CITY_CATEGORIES).find(([, cities]) => cities.includes(cityKey))?.[0]

  return CATEGORY_ICONS[category] || CATEGORY_ICONS.fallback
}

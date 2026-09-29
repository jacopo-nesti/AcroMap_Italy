const dayLabels = {
  monday: "Lunedì",
  tuesday: "Martedì",
  wednesday: "Mercoledì",
  thursday: "Giovedì",
  friday: "Venerdì",
  saturday: "Sabato",
  sunday: "Domenica",
}

export function formatDay(day) {
  if (typeof day !== "string") return ""
  return Object.hasOwn(dayLabels, day) ? dayLabels[day] : day
}

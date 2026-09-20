// Only navigation schemes appropriate for a contact are allowed.
export function contactDestination(type, value) {
  if (typeof value !== "string" || [...value].some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)) {
    throw new Error("Invalid contact")
  }
  const text = value.trim()
  if (type === "phone") {
    const number = text.replace(/^tel:/i, "")
    if (!/^\+?[\d ().-]+$/.test(number) || !/\d/.test(number)) throw new Error("Invalid phone")
    return `tel:${number.replace(/[ ().-]/g, "")}`
  }
  if (type === "email") {
    const address = text.replace(/^mailto:/i, "")
    if (!/^[^\s@?&#%]+@[^\s@?&#%]+\.[^\s@?&#%]+$/.test(address)) throw new Error("Invalid email")
    return `mailto:${address}`
  }
  const url = new URL(text)
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) {
    throw new Error("Invalid URL")
  }
  return url.href
}

export function revealErrorMessage(error) {
  return error?.context?.status === 429 || error?.status === 429
    ? "Hai effettuato troppe richieste. Riprova tra qualche minuto."
    : "Non è stato possibile aprire il contatto. Riprova tra poco."
}

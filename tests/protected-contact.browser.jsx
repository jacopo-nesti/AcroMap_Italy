import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { flushSync } from "react-dom"
import ProtectedContactLink from "../src/components/ProtectedContactLink"
import SocialLinks from "../src/components/SocialLinks"
import CourseCard from "../src/components/CourseCard"
import JamCard from "../src/components/JamCard"
import RegionJamsPage from "../src/pages/RegionJamsPage"
import CityPage from "../src/pages/CityPage"
import { MemoryRouter, Routes, Route } from "react-router"
import { sortByDayAndTime } from "../src/utils/SortingHelper"

const result = document.createElement("pre")
result.id = "result"
document.body.appendChild(result)
const host = document.createElement("div")
document.body.appendChild(host)
const root = createRoot(host)
const widgets = new Map()
const calls = []
const navigations = []
let popupAttempts = 0
const widgetContainers = new Map()
let removedWidgets = 0
let sequence = 0
let response
let resolveRequest
const check = (condition, message) => { if (!condition) throw new Error(message) }
const tick = () => new Promise((resolve) => setTimeout(resolve, 20))
const mount = async (element) => {
  flushSync(() => root.render(<StrictMode>{element}</StrictMode>))
  await tick()
}
const click = async () => {
  flushSync(() => host.querySelector("button").click())
  await tick()
}
const widget = () => [...widgets.values()].at(-1)
window.turnstile = {
  render(container, options) {
    check(options.appearance === "interaction-only", "widget appearance")
    check(options["response-field"] === false, "no token in hidden input")
    const id = ++sequence
    check(options.size === "compact", "compact challenge fits mobile cards")
    const challenge = document.createElement("div")
    challenge.textContent = "Completa la verifica"
    challenge.setAttribute("data-test-challenge", "")
    container.appendChild(challenge)
    widgetContainers.set(id, container)
    widgets.set(id, options)
    return id
  },
  remove(id) {
    widgetContainers.get(id)?.replaceChildren()
    widgetContainers.delete(id)
    widgets.delete(id)
    removedWidgets++
  },
}
window.open = () => { popupAttempts++; throw new Error("No popup should be opened") }
window.__navigate = (destination) => navigations.push(destination)
window.__invoke = async (name, options) => {
  calls.push({ name, ...options.body })
  return response ? response : new Promise((resolve) => { resolveRequest = resolve })
}
const contact = { contact_id: 42, contact_type: "whatsapp", label: "Gruppo WhatsApp", sort_order: 0 }
const button = <ProtectedContactLink key="first" contactId={42} contactType="whatsapp" />
const success = { data: { ok: true, contact: { id: 42, type: "whatsapp", value: "https://example.test/private", is_protected: true, status: "active" } }, error: null }
async function run() {
try {
  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  for (const type of [undefined, "recurring"]) {
    const input = Object.freeze([...weekdays].reverse().map((day) => Object.freeze({ day, type, start_time: "18:00" })))
    check(sortByDayAndTime(input).map((item) => item.day).join() === weekdays.join(), "courses and jams sort by normalized weekdays")
    check(input[0].day === "sunday", "sorting does not mutate source data")
  }
  const mixed = [
    { id: "variable-first", type: "variable", day: "monday", start_time: "20:00" },
    { id: "unknown", day: "unknown", start_time: "19:00" },
    { id: "late", day: "monday", start_time: "20:00" },
    { id: "missing", day: null, start_time: "18:00" },
    { id: "early", day: "monday", start_time: "09:00" },
    { id: "variable-second", type: "variable", day: "sunday", start_time: "08:00" },
  ]
  check(sortByDayAndTime(mixed).map((item) => item.id).join() === "early,late,missing,unknown,variable-first,variable-second", "time order, unknown days and stable variable jams remain unchanged")
  await mount(button)
  check(calls.length === 0 && widgets.size === 0 && popupAttempts === 0, "no work on initial render")
  check(!host.innerHTML.includes("private") && !host.querySelector("a"), "no protected URL in DOM")
  await click()
  check(widgets.size === 1 && host.querySelector("button").disabled, "single widget and disabled button")
  check(host.textContent.includes("Verifica in corso") && host.querySelector(".protected-contact__spinner"), "inline loading feedback")
  check(popupAttempts === 0 && navigations.length === 0, "stay on current page during verification")
  check(host.querySelector(".protected-contact [data-test-challenge]"), "interactive challenge is next to the clicked control")
  await click()
  check(widgets.size === 1 && calls.length === 0, "double click does not start another attempt")
  const first = widget()
  first.callback("token-1")
  first.callback("token-1")
  await tick()
  check(calls.length === 1 && calls[0].contact_id === 42 && calls[0].turnstile_token === "token-1", "one request per token")
  check(calls[0].name === "reveal-protected-contact" && widgets.size === 0, "correct function and widget cleanup")
  resolveRequest(success)
  await tick()
  check(navigations.length === 1 && navigations[0] === success.data.contact.value && popupAttempts === 0, "safe successful navigation")
  check(!host.innerHTML.includes("private"), "revealed URL never rendered")
  await click()
  first.callback("stale-token")
  check(calls.length === 1, "old callback ignored")
  response = { data: null, error: { context: { status: 429 } } }
  widget().callback("token-2")
  await tick()
  check(calls.length === 2 && calls[1].turnstile_token === "token-2", "fresh token for retry")
  check(host.textContent.includes("troppe richieste") && !host.querySelector("button").disabled && !host.querySelector(".protected-contact__spinner") && navigations.length === 1, "429 restores the control without navigation")
  response = { data: { ok: false }, error: null }
  await click()
  widget().callback("token-3")
  await tick()
  check(host.textContent.includes("Non è stato possibile"), "API failure message")
  await click()
  widget()["expired-callback"]()
  await tick()
  check(widgets.size === 0 && !host.querySelector("button").disabled && calls.length === 3, "expiry allows retry without reveal")
  await click()
  widget()["error-callback"]()
  await tick()
  check(widgets.size === 0 && !host.querySelector("button").disabled, "challenge errors allow retry")
  response = null
  await click()
  widget().callback("token-4")
  await tick()
  await mount(<span>Other page</span>)
  resolveRequest(success)
  await tick()
  check(navigations.length === 1 && widgets.size === 0, "unmount suppresses late responses")
  await mount(<SocialLinks community={{ name: "Test", website: "https://example.test/public", protected_contacts: [contact] }} />)
  check(host.querySelector("a").href === "https://example.test/public" && host.querySelector("button").textContent.includes(contact.label), "public and protected group contacts")
  await mount(<CourseCard course={{ name: "Test", day: "monday", contact: { url: "https://example.test/course" }, protected_contacts: [contact] }} />)
  check(host.querySelector("a").href.endsWith("/course") && host.querySelector("button"), "public and protected course contacts")
  check(host.querySelector(".city-activity-card__day")?.textContent === "Lunedì", "course uses the Italian day formatter")
  for (const type of ["recurring", "variable"]) {
    await mount(<JamCard jam={{ type, day: "wednesday", protected_contacts: [contact] }} />)
    check(host.querySelector("button"), `${type} jam contact`)
    check(host.querySelector(".city-activity-card__day")?.textContent === (type === "recurring" ? "Mercoledì" : undefined), "jam localizes its day only when displayed")
  }
  await mount(<SocialLinks community={{ name: "Only protected", protected_contacts: [contact] }} />)
  check(host.querySelector("button"), "group with only protected contacts")
  window.__cities = [{ name: "Test city", slug: "test", region: "Test region", communities: [{ id: 1, name: "Test group", jams: [{ id: 1, type: "recurring", day: "sunday", protected_contacts: [contact] }] }] }]
  await mount(<MemoryRouter initialEntries={["/region/test-region/jams"]}><Routes><Route path="/region/:regionSlug/jams" element={<RegionJamsPage />} /></Routes></MemoryRouter>)
  check(host.querySelector(".region-jam-card button"), "regional jam contact")
  check(host.querySelector(".protected-contacts-info__trigger"), "regional jam page shows the protection badge")
  check(host.querySelector(".region-jam-card__day")?.textContent.trim() === "Domenica", "regional jam uses the Italian day formatter")
  check(window.__cities[0].communities[0].jams[0].day === "sunday", "source day remains normalized")
  const badge = host.querySelector(".protected-contacts-info__trigger")
  check(badge.getAttribute("aria-expanded") === "false", "protection badge starts closed")
  flushSync(() => badge.click())
  check(badge.getAttribute("aria-expanded") === "true" && !host.querySelector(".protected-contacts-info__panel").hidden, "badge opens its accessible panel")
  check(host.querySelector('.protected-contacts-info__panel a[href="/privacy"]')?.textContent === "Scopri di più nella Privacy Policy di AcroFinder", "panel links to the privacy policy")
  const turnstileInfoLink = host.querySelector('.protected-contacts-info__panel a[href="https://www.cloudflare.com/en-gb/application-services/products/turnstile/"]')
  check(turnstileInfoLink?.textContent === "Cos'è Cloudflare Turnstile?" && turnstileInfoLink.target === "_blank" && turnstileInfoLink.rel === "noopener noreferrer", "Turnstile explanation opens safely in a new tab")
  check(host.querySelector(".protected-contacts-info__panel p")?.textContent === "I numeri di telefono e i link WhatsApp protetti non vengono caricati pubblicamente. Per visualizzarli è richiesta una verifica anti-bot con Cloudflare Turnstile (Cos'è Cloudflare Turnstile?)", "popover copy matches approved text")
  flushSync(() => badge.click())
  check(badge.getAttribute("aria-expanded") === "false" && host.querySelector(".protected-contacts-info__panel").hidden, "second badge click closes panel")
  flushSync(() => badge.click())
  await tick()
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }))
  await tick()
  check(badge.getAttribute("aria-expanded") === "false" && document.activeElement === badge, "Escape closes panel and restores focus")
  flushSync(() => badge.click())
  await tick()
  document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }))
  await tick()
  check(badge.getAttribute("aria-expanded") === "false", "outside tap closes panel")
  flushSync(() => badge.click())
  flushSync(() => host.querySelector(".protected-contacts-info__close").click())
  check(badge.getAttribute("aria-expanded") === "false", "close button closes panel")
  for (const eventName of ["scroll", "wheel", "touchmove"]) {
    flushSync(() => badge.click())
    await tick()
    window.dispatchEvent(new Event(eventName))
    await tick()
    check(badge.getAttribute("aria-expanded") === "false", `${eventName} closes panel`)
  }
  flushSync(() => badge.click())
  await tick()
  window.dispatchEvent(new MouseEvent("mousemove"))
  await tick()
  check(badge.getAttribute("aria-expanded") === "true", "mouse movement alone does not close panel")
  window.__cities = [{ name: "Test city", slug: "test", region: "Test region", communities: [{ id: 1, name: "Test group", jams: [{ id: 1, type: "recurring", day: "sunday", protected_contacts: [] }] }] }]
  await mount(<MemoryRouter initialEntries={["/region/test-region/jams"]}><Routes><Route path="/region/:regionSlug/jams" element={<RegionJamsPage />} /></Routes></MemoryRouter>)
  check(!host.querySelector(".protected-contacts-info"), "regional jam page without protected contacts has no badge")
  const cityCommunities = [{ id: 1, name: "First group", protected_contacts: [], courses: [], jams: [] }, { id: 2, name: "Second group", protected_contacts: [], courses: [], jams: [] }]
  for (const placement of ["group", "course", "jam"]) {
    const protectedCommunity = { ...cityCommunities[0] }
    if (placement === "group") protectedCommunity.protected_contacts = [contact]
    if (placement === "course") protectedCommunity.courses = [{ id: 2, protected_contacts: [contact] }]
    if (placement === "jam") protectedCommunity.jams = [{ id: 3, protected_contacts: [contact] }]
    window.__cities = [{ name: "Test city", slug: "test", region: "Test region", communities: [protectedCommunity, cityCommunities[1]] }]
    await mount(<MemoryRouter initialEntries={["/city/test"]}><Routes><Route path="/city/:slug" element={<CityPage />} /></Routes></MemoryRouter>)
    check(host.querySelector(".protected-contacts-info__trigger"), `city page shows badge for protected ${placement} contact`)
  }
  window.__cities = [{ name: "Test city", slug: "test", region: "Test region", communities: cityCommunities }]
  await mount(<MemoryRouter initialEntries={["/city/test"]}><Routes><Route path="/city/:slug" element={<CityPage />} /></Routes></MemoryRouter>)
  check(!host.querySelector(".protected-contacts-info"), "city page without protected contacts has no badge")
  await mount(<CourseCard course={{ day: null }} />)
  check(!host.querySelector(".city-activity-card__day"), "missing day is not displayed")
  await mount(<JamCard jam={{ type: "recurring", day: "Prima domenica del mese" }} />)
  check(host.querySelector(".city-activity-card__day")?.textContent === "Prima domenica del mese", "unknown day text is preserved in cards")
  flushSync(() => root.unmount())
  check(popupAttempts === 0 && removedWidgets === sequence && widgets.size === 0, "no popups and complete StrictMode widget cleanup")
  result.textContent = "PASS: StrictMode, idle privacy, token lifecycle, duplicate prevention, stale callbacks, 429, errors, expiry, unmount, navigation, group/course/jam contacts"
} catch (error) {
  result.textContent = `FAIL: ${error.message}`
}

}
void run()

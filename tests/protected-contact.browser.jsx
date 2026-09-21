import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { flushSync } from "react-dom"
import ProtectedContactLink from "../src/components/ProtectedContactLink"
import SocialLinks from "../src/components/SocialLinks"
import CourseCard from "../src/components/CourseCard"
import JamCard from "../src/components/JamCard"
import RegionJamsPage from "../src/pages/RegionJamsPage"
import { MemoryRouter, Routes, Route } from "react-router"

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
  await mount(<CourseCard course={{ name: "Test", contact: { url: "https://example.test/course" }, protected_contacts: [contact] }} />)
  check(host.querySelector("a").href.endsWith("/course") && host.querySelector("button"), "public and protected course contacts")
  for (const type of ["recurring", "variable"]) {
    await mount(<JamCard jam={{ type, protected_contacts: [contact] }} />)
    check(host.querySelector("button"), `${type} jam contact`)
  }
  await mount(<SocialLinks community={{ name: "Only protected", protected_contacts: [contact] }} />)
  check(host.querySelector("button"), "group with only protected contacts")
  window.__cities = [{ name: "Test city", slug: "test", region: "Test region", communities: [{ id: 1, name: "Test group", jams: [{ id: 1, type: "recurring", protected_contacts: [contact] }] }] }]
  await mount(<MemoryRouter initialEntries={["/region/test-region/jams"]}><Routes><Route path="/region/:regionSlug/jams" element={<RegionJamsPage />} /></Routes></MemoryRouter>)
  check(host.querySelector(".region-jam-card button"), "regional jam contact")
  flushSync(() => root.unmount())
  check(popupAttempts === 0 && removedWidgets === sequence && widgets.size === 0, "no popups and complete StrictMode widget cleanup")
  result.textContent = "PASS: StrictMode, idle privacy, token lifecycle, duplicate prevention, stale callbacks, 429, errors, expiry, unmount, navigation, group/course/jam contacts"
} catch (error) {
  result.textContent = `FAIL: ${error.message}`
}

}
void run()

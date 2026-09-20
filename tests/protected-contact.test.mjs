import test from "node:test"
import assert from "node:assert/strict"
import { contactDestination, revealErrorMessage } from "../src/utils/protectedContact.js"

test("all web contact types use HTTP(S) links", () => {
  for (const type of ["whatsapp", "telegram", "website", "instagram", "facebook", "youtube", "x", "other"]) {
    assert.equal(contactDestination(type, "https://example.test/contact?a=1"), "https://example.test/contact?a=1")
  }
})
test("phone and email use their native handlers", () => {
  assert.equal(contactDestination("phone", "+39 123-456 (789)"), "tel:+39123456789")
  assert.equal(contactDestination("phone", "tel:+39123456789"), "tel:+39123456789")
  assert.equal(contactDestination("email", "hello@example.test"), "mailto:hello@example.test")
  assert.equal(contactDestination("email", "mailto:hello@example.test"), "mailto:hello@example.test")
})
test("unsafe schemes and malformed contacts never become navigation targets", () => {
  for (const value of ["javascript:alert(1)", "data:text/html,hello", "/relative", "https://user:pass@example.test", "https://example.test\n", "", null]) {
    assert.throws(() => contactDestination("website", value))
  }
  assert.throws(() => contactDestination("phone", "javascript:123"))
  assert.throws(() => contactDestination("email", "hello@example.test?bcc=someone@example.test"))
})
test("429 is friendly and other failures do not expose internal details", () => {
  assert.match(revealErrorMessage({ context: { status: 429 } }), /troppe richieste/)
  assert.match(revealErrorMessage({ status: 429 }), /troppe richieste/)
  assert.equal(revealErrorMessage(new Error("private backend detail")), "Non è stato possibile aprire il contatto. Riprova tra poco.")
})

// Real React lifecycle test in local headless Chrome. All external services are mocked.
test("protected contact browser flow", async (t) => {
  const { existsSync } = await import("node:fs")
  const { mkdtemp, writeFile, rm } = await import("node:fs/promises")
  const { tmpdir } = await import("node:os")
  const { join, resolve, dirname, basename } = await import("node:path")
  const { pathToFileURL } = await import("node:url")
  const { execFile } = await import("node:child_process")
  const { promisify } = await import("node:util")
  const chrome = process.env.CHROME_BIN || "C:/Program Files/Google/Chrome/Application/chrome.exe"
  if (!existsSync(chrome)) return t.skip("Set CHROME_BIN to run the browser checks")
  const { build } = await import("rolldown")
  const temp = await mkdtemp(join(tmpdir(), "acrofinder-contacts-"))
  try {
    const bundle = await build({
      input: resolve("tests/protected-contact.browser.jsx"),
      platform: "browser",
      transform: { jsx: "react-jsx", define: { "import.meta.hot": "false", "process.env.NODE_ENV": '"development"', "import.meta.env.VITE_TURNSTILE_SITE_KEY": '"test-site-key"' } },
      plugins: [{
        name: "offline-services",
        resolveId(source) {
          if (source.endsWith("lib/supabase")) return "\0mock-supabase"
          if (source.endsWith("components/CommunityFinder")) return "\0mock-context"
          if (source.endsWith(".css")) return "\0empty-css"
        },
        load(id) {
          if (id === "\0mock-supabase") return "export const supabase = { functions: { invoke: (...args) => window.__invoke(...args) } }"
          if (id === "\0mock-context") return "export const useCommunityFinderContext = () => ({cities: window.__cities, isLoading: false, error: null})"
          if (id === "\0empty-css") return ""
        },
      }],
      output: { format: "iife", file: join(temp, "test.js") },
    })
    assert.ok(bundle.output.length)
    await writeFile(join(temp, "index.html"), '<!doctype html><html><body><script src="test.js"></script></body></html>')
    const { stdout } = await promisify(execFile)(chrome, [
      "--headless", "--disable-gpu", "--disable-background-networking", "--no-first-run", "--no-default-browser-check",
      `--user-data-dir=${join(temp, "profile")}`, "--virtual-time-budget=10000", "--dump-dom", pathToFileURL(join(temp, "index.html")).href,
    ], { timeout: 30000, maxBuffer: 2 * 1024 * 1024 })
    assert.match(stdout, /PASS: StrictMode/, stdout.match(/FAIL:[^<]+/)?.[0] || stdout)
  } finally {
    assert.ok(dirname(resolve(temp)) === resolve(tmpdir()) && basename(temp).startsWith("acrofinder-contacts-"))
    await rm(temp, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
  }
})

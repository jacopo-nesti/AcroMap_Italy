import { useEffect, useRef } from "react"

function TurnstileWidget({ onVerify, onExpire, onError }) {
  const containerRef = useRef(null)
  const callbacks = useRef({ onVerify, onExpire, onError })
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  useEffect(() => {
    callbacks.current = { onVerify, onExpire, onError }
  }, [onVerify, onExpire, onError])

  useEffect(() => {
    let cancelled = false
    let widgetId = null
    let intervalId
    let timeoutId
    const notify = (name, value) => {
      if (!cancelled) callbacks.current[name]?.(value)
    }
    const render = () => {
      if (cancelled || !window.turnstile || !containerRef.current) return
      clearInterval(intervalId)
      clearTimeout(timeoutId)
      try {
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "auto",
          appearance: "interaction-only",
          size: "compact",
          "response-field": false,
          retry: "never",
          callback: (token) => notify("onVerify", token),
          "expired-callback": () => notify("onExpire"),
          "timeout-callback": () => notify("onExpire"),
          "error-callback": () => notify("onError"),
        })
      } catch {
        notify("onError")
      }
    }

    if (!siteKey) {
      notify("onError")
    } else if (window.turnstile) {
      render()
    } else {
      intervalId = setInterval(render, 100)
      timeoutId = setTimeout(() => {
        clearInterval(intervalId)
        notify("onError")
      }, 15000)
    }

    return () => {
      cancelled = true
      clearInterval(intervalId)
      clearTimeout(timeoutId)
      if (widgetId !== null) {
        try { window.turnstile?.remove(widgetId) } catch { /* Already removed. */ }
      }
    }
  }, [siteKey])

  return <div ref={containerRef} />
}

export default TurnstileWidget

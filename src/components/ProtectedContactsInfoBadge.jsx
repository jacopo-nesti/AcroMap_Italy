import { useEffect, useId, useRef, useState } from "react"
import { Link } from "react-router"
import "../styles/protected-contacts-info-badge.css"

function ProtectedContactsInfoBadge() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const panelId = useId()
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false)
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    const handlePageMovement = () => setIsOpen(false)

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("scroll", handlePageMovement, true)
    window.addEventListener("wheel", handlePageMovement, { passive: true, capture: true })
    window.addEventListener("touchmove", handlePageMovement, { passive: true, capture: true })

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("scroll", handlePageMovement, true)
      window.removeEventListener("wheel", handlePageMovement, true)
      window.removeEventListener("touchmove", handlePageMovement, true)
    }
  }, [isOpen])

  return (
    <aside className="protected-contacts-info" ref={containerRef} aria-label="Informazioni sui contatti protetti">
      <button
        className="protected-contacts-info__trigger"
        type="button"
        ref={triggerRef}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <i className="bi bi-shield-check" aria-hidden="true" />
        <span className="protected-contacts-info__text">
          <strong>Contatti protetti</strong>
          <span>Verifica anti-bot</span>
        </span>
      </button>
      <div className="protected-contacts-info__panel" id={panelId} role="region" aria-labelledby={titleId} hidden={!isOpen}>
        <button
          className="protected-contacts-info__close"
          type="button"
          aria-label="Chiudi informazioni sui contatti protetti"
          onClick={() => {
            setIsOpen(false)
            triggerRef.current?.focus()
          }}
        >
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
        <h2 id={titleId}>Proteggiamo i contatti personali</h2>
        <p>
          I numeri di telefono e i link WhatsApp protetti non vengono caricati pubblicamente. Per visualizzarli è richiesta una verifica anti-bot con Cloudflare Turnstile (<a href="https://www.cloudflare.com/en-gb/application-services/products/turnstile/" target="_blank" rel="noopener noreferrer">Cos'è Cloudflare Turnstile?</a>)
        </p>
        <Link to="/privacy" onClick={() => setIsOpen(false)}>Scopri di più nella Privacy Policy di AcroFinder</Link>
      </div>
    </aside>
  )
}

export default ProtectedContactsInfoBadge

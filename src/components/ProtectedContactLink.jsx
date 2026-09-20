import { useEffect, useId, useRef, useState } from "react"
import TurnstileWidget from "./TurnstileWidget"
import { revealProtectedContact } from "../services/contactService"
import { contactDestination, revealErrorMessage } from "../utils/protectedContact"
import "../styles/protected-contact.css"

const types = {
  whatsapp: ["WhatsApp", "bi-whatsapp"],
  phone: ["Telefono", "bi-telephone"],
  email: ["Email", "bi-envelope"],
  telegram: ["Telegram", "bi-telegram"],
  website: ["Sito web", "bi-globe"],
  instagram: ["Instagram", "bi-instagram"],
  facebook: ["Facebook", "bi-facebook"],
  youtube: ["YouTube", "bi-youtube"],
  x: ["X", "bi-twitter-x"],
  other: ["Contatto", "bi-chat-dots"],
}

function closePendingWindow(attempt) {
  if (attempt?.popup && !attempt.popup.closed) attempt.popup.close()
}

export default function ProtectedContactLink({ contactId, contactType, label, className = "" }) {
  const [phase, setPhase] = useState("idle")
  const [message, setMessage] = useState("")
  const attemptRef = useRef(null)
  const messageId = useId()
  const [defaultLabel, icon] = types[contactType] || types.other

  useEffect(() => () => {
    closePendingWindow(attemptRef.current)
    attemptRef.current = null
  }, [contactId, contactType])

  const fail = (attempt, error) => {
    if (attemptRef.current !== attempt) return
    closePendingWindow(attempt)
    attemptRef.current = null
    setPhase("idle")
    setMessage(revealErrorMessage(error))
  }

  const start = () => {
    if (attemptRef.current) return
    const attempt = { requested: false, popup: null }
    attemptRef.current = attempt
    setMessage("")
    setPhase("verifying")
    // Reserve the tab during the user gesture to avoid async popup blocking.
    // No contact value is known here. Disconnect the opener before navigation.
    if (!["phone", "email"].includes(contactType)) {
      try {
        attempt.popup = window.open("about:blank", "_blank")
        if (attempt.popup) {
          attempt.popup.opener = null
          const meta = attempt.popup.document.createElement("meta")
          meta.name = "referrer"
          meta.content = "no-referrer"
          attempt.popup.document.head.appendChild(meta)
          attempt.popup.document.title = "Verifica del contatto"
          attempt.popup.document.body.textContent = "Verifica in corso. Se richiesto, completa la verifica nella pagina AcroFinder."
          window.focus()
        }
      } catch {
        closePendingWindow(attempt)
        attempt.popup = null
      }
    }
  }

  const verify = async (token) => {
    const attempt = attemptRef.current
    if (!attempt || attempt.requested) return
    attempt.requested = true
    setPhase("revealing") // Unmount the widget; the token is used exactly once.
    try {
      const contact = await revealProtectedContact(contactId, token)
      if (attemptRef.current !== attempt) return
      if (contact.type !== contactType) throw new Error("Unexpected contact type")
      const destination = contactDestination(contact.type, contact.value)
      if (attempt.popup && !attempt.popup.closed) {
        attempt.popup.location.replace(destination)
      } else {
        // Browsers that block new tabs can still open the contact in this tab.
        window.location.assign(destination)
      }
      attemptRef.current = null
      setPhase("idle")
    } catch (error) {
      fail(attempt, error)
    }
  }

  return (
    <div className="protected-contact">
      <button type="button" className={`protected-contact__button ${className}`}
        disabled={phase !== "idle"} aria-busy={phase !== "idle"}
        aria-describedby={message ? messageId : undefined} onClick={start}>
        <i className={`bi ${icon}`} aria-hidden="true" />
        <span>{phase === "idle" ? label || defaultLabel : "Verifica..."}</span>
      </button>
      {phase === "verifying" && <TurnstileWidget onVerify={verify}
        onExpire={() => { if (!attemptRef.current?.requested) fail(attemptRef.current) }}
        onError={() => { if (!attemptRef.current?.requested) fail(attemptRef.current) }} />}
      {message && <span id={messageId} className="protected-contact__error" role="alert">{message}</span>}
    </div>
  )
}

export function ProtectedContacts({ contacts = [], className = "", social = false }) {
  return [...(contacts || [])].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)).map((contact) => (
    <ProtectedContactLink key={contact.contact_id} contactId={contact.contact_id}
      contactType={contact.contact_type} label={contact.label}
      className={social
        ? `city-social-links__${["whatsapp", "instagram", "facebook"].includes(contact.contact_type) ? contact.contact_type : "website"}`
        : className} />
  ))
}

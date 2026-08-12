import { useState } from "react"
import SEO from "../components/SEO"

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Avvia la dissolvenza in uscita del form
    setIsFadingOut(true)

    // Attende la fine della transizione CSS prima di mostrare il messaggio
    setTimeout(() => {
      setIsSubmitted(true)
    }, 300)
  }

  return (
    <main className="container my-5">

      <SEO
        title="Contatti | AcroFinder"
        description="Contatta AcroFinder per informazioni, segnalazioni o richieste relative al progetto."
      />

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <h1 className="fw-bold mb-3">Contattaci</h1>
          <p className="text-muted mb-4">
            Hai domande, suggerimenti o vuoi segnalare una nuova community?
            Scrivici un messaggio!
          </p>

          <div
            style={{
              transition: "opacity 300ms ease-in-out, transform 300ms ease-in-out",
              opacity: isFadingOut && !isSubmitted ? 0 : 1,
              transform: isFadingOut && !isSubmitted ? "translateY(-10px)" : "translateY(0)",
            }}
          >
            {isSubmitted ? (
              <div
                className="alert alert-success py-4 shadow-sm rounded-3"
                role="alert"
                style={{
                  animation: "fadeIn 400ms ease-in-out",
                }}
              >
                <h4 className="alert-heading fw-bold mb-2">Messaggio inviato!</h4>
                <p className="mb-0">
                  Grazie per averci contattato. Ti risponderemo il prima possibile.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="text-start">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label fw-semibold">
                    Oggetto
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label fw-semibold">
                    Messaggio
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success w-100 py-2 fw-semibold">
                  Invia Messaggio
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContactPage
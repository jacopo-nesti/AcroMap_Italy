import SEO from "../components/SEO"

function ContactPage() {
  return (
    <div className="container my-5">
      <SEO
        title="Contatti | AcroFinder"
        description="Contatta AcroFinder per informazioni, suggerimenti o segnalazioni relative al progetto."
      />

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 text-center">
          <h1 className="fw-bold mb-3">Contattaci</h1>

          <p className="text-muted mb-4">
            Hai una domanda, un suggerimento o vuoi segnalare una nuova community? 
            Compila il modulo di contatto: leggeremo il tuo messaggio e ti risponderemo il prima possibile.
          </p>

          <a
            href="https://tally.so/r/81DR1Y"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success btn-lg px-5 py-3 fw-semibold shadow-sm"
          >
            Apri il modulo di contatto
            <i className="bi bi-arrow-up-right ms-2" aria-hidden="true"></i>
          </a>

          <p className="text-muted small mt-3 mb-0">
            Il modulo si aprirà in una nuova scheda.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactPage

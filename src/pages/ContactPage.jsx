import SEO from "../components/SEO"

function ContactPage() {
  return (
    <main className="contact-page">
      
      <SEO
        title="Contatti | AcroFinder"
        description="Contatta AcroFinder per informazioni, segnalazioni o suggerimenti sul progetto."
        canonical="https://acrofinder.it/contactus"
      />

      <div className="container contact-page__container">
        <div className="contact-page__content">
          <span className="contact-page__badge">
            Contatti
          </span>

          <div className="contact-page__icon" aria-hidden="true">
            <i className="bi bi-envelope" />
          </div>

          <h1 className="contact-page__title">
            Contattaci
          </h1>

          <p className="contact-page__description">
            Hai una domanda, un suggerimento o vuoi metterti in contatto con
            AcroFinder? Scrivici tramite il modulo di contatto e ti
            risponderemo il prima possibile.
          </p>

          <a
            href="https://tally.so/r/81DR1Y"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-page__button"
          >
            Apri il modulo di contatto
            <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </a>

          <p className="contact-page__note">
            Il modulo si aprirà in una nuova scheda.
          </p>
        </div>
      </div>
    </main>
  )
}

export default ContactPage
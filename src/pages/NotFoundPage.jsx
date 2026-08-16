import { Link } from "react-router"
import SEO from "../components/SEO"
import notFoundImage from "../assets/images/notfound-acroyoga.webp"

function NotFound() {
  return (
    <main className="not-found">
      <SEO
        title="Pagina non trovata | AcroFinder"
        description="La pagina che stai cercando non è disponibile."
      />

      <div className="container not-found__container">
        <div className="not-found__content">

          <img
            src={notFoundImage}
            alt="Due persone che fanno Acroyoga ma non hanno lo spotter per fare quel movimento in sicurezza."
            className="not-found__illustration"
          />

          <span className="not-found__code">404</span>

          <h1 className="not-found__title">
            Spotter not found.
          </h1>

          <p className="not-found__description">
            Sembra che questa pagina sia uscita dalla zona di sicurezza.
            Torna alla Home e ripartiamo da una base stabile.
          </p>

          <Link to="/" className="not-found__button">
            <i className="bi bi-house-door-fill" aria-hidden="true" />
            Torna alla Home
          </Link>

        </div>
      </div>
    </main>
  )
}

export default NotFound
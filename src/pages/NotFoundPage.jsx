import { Link } from 'react-router'
import SEO from "../components/SEO"

function NotFound() {
  return (
    <div className="container py-5 text-center my-5">

      <SEO
        title="Pagina non trovata | AcroFinder"
        description="La pagina che stai cercando non è disponibile."
      />
      
      <div className="row justify-content-center">
        <div className="col-md-6">
          <i className="bi bi-compass text-success display-1 mb-3 d-block"></i>
          
          <h1 className="display-4 fw-bold text-dark mb-2">404</h1>
          <h2 className="h4 text-secondary mb-3">Oops! Questa pagina non esiste.</h2>
          
          <p className="text-muted mb-4">
            Sembra che tu ti sia smarrito. Torna alla Home per esplorare le community di AcroMap Italy.
          </p>

          <Link to="/" className="btn btn-success btn-lg px-4 fw-semibold shadow-sm rounded-pill">
            <i className="bi bi-house-door-fill me-2"></i>
            Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
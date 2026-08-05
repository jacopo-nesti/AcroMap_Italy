import { Link } from 'react-router'

function Donations() {
  return (
    <div className="container py-5 my-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 text-center">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
            <i className="bi bi-heart-fill text-success display-1 mb-3 d-block"></i>

            <span className="badge bg-success-subtle text-success mb-3 px-3 py-2 rounded-pill fw-semibold">
              Prossimamente
            </span>

            <h1 className="h2 fw-bold text-dark mb-3">Sostieni AcroMap Italy</h1>

            <p className="text-secondary mb-4">
              Stiamo lavorando per integrare la possibilità di effettuare donazioni a sostegno del progetto. Questa funzionalità sarà disponibile a breve!
            </p>

            <Link to="/" className="btn btn-success rounded-pill px-4 py-2 fw-semibold shadow-sm">
              <i className="bi bi-house-door-fill me-2"></i>
              Torna alla Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donations
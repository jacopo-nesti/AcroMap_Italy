import { Link } from 'react-router'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container px-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center text-md-start">
        
        <span className="fw-semibold text-secondary small">
          &copy; {currentYear} AcroMap Italy - Progetto indipendente dedicato alla community italiana di Acroyoga.
        </span>

        <div className="d-flex flex-wrap justify-content-center justify-content-md-end align-items-center gap-2 gap-md-3 small">

          <Link to="/privacy" className="text-light text-decoration-none hover-opacity">
            Privacy Policy
          </Link>

          <span className="text-secondary">|</span>

          <Link to="/terms" className="text-light text-decoration-none hover-opacity">
            Termini di utilizzo
          </Link>

          <span className="text-secondary">|</span>

          <Link to="/contribute" className="text-success text-decoration-none fw-semibold">
            Contribuisci
          </Link>

          <span className="text-secondary">|</span>

          <Link to="/aboutus" className="text-success text-decoration-none fw-semibold">
            Chi siamo
          </Link>

          <span className="text-secondary">|</span>

          <Link to="/contactus" className="text-success text-decoration-none fw-semibold">
            Contatti
          </Link>

        </div>

      </div>
    </footer>
  )
}

export default Footer
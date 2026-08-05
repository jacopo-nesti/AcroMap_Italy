import { Link } from 'react-router'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        
        {/* Copyright */}
        <span className="fw-semibold text-secondary small">
          &copy; {currentYear} AcroMap Italy
        </span>

        {/* Link utili */}
        <div className="d-flex align-items-center gap-3 small">
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
        </div>

      </div>
    </footer>
  )
}

export default Footer
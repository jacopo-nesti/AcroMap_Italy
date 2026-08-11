import { Link } from 'react-router'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5">
      <div className="container px-4">
        
        {/* Griglia Principale */}
        <div className="row g-4 mb-4">
          
          {/* Colonna 1: Info Progetto */}
          <div className="col-12 col-md-6 col-lg-5">
            <h3 className="h5 fw-bold text-white mb-2">
              AcroMap Italy
            </h3>
            <p className="text-light opacity-75 small mb-0 lh-lg" style={{ maxWidth: '360px' }}>
              Progetto indipendente dedicato alla community italiana di Acroyoga.
            </p>
          </div>

          {/* Colonna 2: Legale */}
          <div className="col-6 col-md-3 col-lg-3">
            <h6 
              className="text-uppercase text-success fw-semibold mb-3" 
              style={{ fontSize: '11px', letterSpacing: '0.08em' }}
            >
              Legale
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/privacy" className="text-light text-decoration-none fw-medium small hover-opacity">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-light text-decoration-none fw-medium small hover-opacity">
                  Termini di utilizzo
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonna 3: Progetto */}
          <div className="col-6 col-md-3 col-lg-4">
            <h6 
              className="text-uppercase text-success fw-semibold mb-3" 
              style={{ fontSize: '11px', letterSpacing: '0.08em' }}
            >
              Progetto
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li>
                <Link to="/aboutus" className="text-light text-decoration-none fw-medium small hover-opacity">
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="text-light text-decoration-none fw-medium small hover-opacity">
                  Contribuisci
                </Link>
              </li>
              <li>
                <Link to="/contactus" className="text-light text-decoration-none fw-medium small hover-opacity">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Riga Divisoria */}
        <div className="pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Copyright */}
          <span style={{ color: '#6B7269', fontSize: '12px' }}>
            &copy; {currentYear} AcroMap Italy. Tutti i diritti riservati.
          </span>
        </div>

      </div>
    </footer>
  )
}

export default Footer
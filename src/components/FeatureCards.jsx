import { Link } from 'react-router'

function FeatureCards() {
  return (
    /* Aumentato lo spazio superiore (mt-5 / style marginTop) per abbassare le card */
    <section className="container text-center mt-5 mb-3" style={{ marginTop: '2.5rem' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="row g-4 text-start mb-2">
            
            {/* Prima card con gradiente */}
            <div className="col-md-4">
              <article 
                className="card h-100 p-4 rounded-4 shadow-sm border border-success-subtle"
                style={{
                  background: 'linear-gradient(135deg, #d1e7dd 0%, #f4fbf7 50%, #ffffff 100%)'
                }}
              >
                <i className="bi bi-search text-success fs-1 mb-3"></i>
                <h2 className="h5 fw-bold text-dark mb-2">Trova una community</h2>
                <p className="text-muted small mb-0">
                  Cerca una città e scopri i gruppi attivi.
                </p>
              </article>
            </div>

            <div className="col-md-4">
              <article className="card h-100 bg-white p-4 rounded-4 shadow-sm border border-light-subtle">
                <i className="bi bi-geo-alt-fill text-success fs-1 mb-3"></i>
                <h2 className="h5 fw-bold text-dark mb-2">Esplora l'Italia</h2>
                <p className="text-muted small mb-0">
                  Visualizza tutte le community sulla mappa e le loro informazioni.
                </p>
              </article>
            </div>

            <div className="col-md-4">
              <Link 
                to="/contribute" 
                className="card h-100 bg-white p-4 rounded-4 shadow-sm text-decoration-none border border-light-subtle"
                style={{ transition: 'all 0.2s ease-in-out', cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)'
                  e.currentTarget.style.borderColor = '#198754'
                  e.currentTarget.style.backgroundColor = '#f4fbf7'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.backgroundColor = '#ffffff'
                }}
              >
                <i className="bi bi-people-fill text-success fs-1 mb-3"></i>
                <h2 className="h5 fw-bold text-dark mb-2">
                  Contribuisci <i className="bi bi-arrow-right-short small"></i>
                </h2>
                <p className="text-muted small mb-0">
                  La tua community manca o è da aggiornare? Invia una segnalazione dal modulo.
                </p>
              </Link>
            </div>

          </div>
        </div>
      </div>

      <p className="text-muted small mt-3 mx-auto" style={{ maxWidth: '800px' }}>
        AcroMap Italy è un progetto in continua crescita. Se la tua community non è ancora presente, puoi segnalarla tramite il modulo di contribuzione e aiutarci a mantenere la mappa sempre aggiornata.
      </p>
    </section>
  )
}

export default FeatureCards
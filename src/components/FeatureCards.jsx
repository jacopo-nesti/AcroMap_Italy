import { Link } from 'react-router'

function FeatureCards() {
  return (
    <section className="container text-center my-5">
      <div className="row g-4">
        
        <article className="col-md-4 bg-light p-4 rounded shadow-sm">
          <i className="bi bi-search text-success fs-1 d-block mb-2"></i>
          <h2 className="h5 fw-bold text-dark">Trova una community</h2>
          <p className="text-muted small mb-0">
            Cerca una città e scopri i gruppi attivi.
          </p>
        </article>

        <article className="col-md-4 bg-light p-4 rounded shadow-sm">
          <i className="bi bi-geo-alt-fill text-success fs-1 d-block mb-2"></i>
          <h2 className="h5 fw-bold text-dark">Esplora l'Italia</h2>
          <p className="text-muted small mb-0">
            Visualizza tutte le community sulla mappa e le loro informazioni.
          </p>
        </article>

        <div className="col-md-4">
          <Link 
            to="/contribute" 
            className="d-block bg-light p-4 rounded shadow-sm text-decoration-none h-100 shadow-hover border border-transparent"
            style={{ transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <i className="bi bi-people-fill text-success fs-1 d-block mb-2"></i>
            <h2 className="h5 fw-bold text-dark">
              Contribuisci <i className="bi bi-arrow-right-short small"></i>
            </h2>
            <p className="text-muted small mb-0">
              La tua community manca o è da aggiornare? Invia una segnalazione dal modulo.
            </p>
          </Link>
        </div>

      </div>

      <p className="text-muted small mt-4 mx-auto" style={{ maxWidth: '800px' }}>
        AcroMap Italy è un progetto in continua crescita. Se la tua community non è ancora presente, puoi segnalarla tramite il modulo di contribuzione e aiutarci a mantenere la mappa sempre aggiornata.
      </p>
    </section>
  )
}

export default FeatureCards
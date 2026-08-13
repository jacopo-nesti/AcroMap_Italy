import BackButton from "../components/BackButton"
import SEO from "../components/SEO"

function Privacy() {
  return (
    <div className="container-fluid container-xl py-5">

      <SEO
        title="Privacy Policy | AcroFinder"
        description="Consulta la Privacy Policy di AcroFinder e scopri come vengono gestite le informazioni inviate tramite il sito."
      />
      
      <div className="row justify-content-center">
        <div className="col-lg-9 col-xl-8">
          
          {/* Tasto Indietro */}
          <div className="mb-3">
            <BackButton />
          </div>

          {/* Header Pagina */}
          <div className="text-center mb-5">
            <span 
              className="badge mb-2 px-3 py-2 rounded-pill fw-semibold text-white"
              style={{ backgroundColor: '#15803d' }}
            >
              Informativa sulla Privacy
            </span>
            <h1 className="display-5 fw-bold text-dark mb-2">Privacy Policy</h1>
            <p className="small" style={{ color: '#64748b' }}>Ultimo aggiornamento: agosto 2026</p>
          </div>

          {/* Contenuto principale */}
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
            
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-shield-check" style={{ color: '#15803d' }}></i>
                1. Titolare del progetto
              </h2>
              <p className="mb-0" style={{ color: '#334155' }}>
                AcroFinder è un progetto indipendente dedicato alla raccolta e organizzazione delle informazioni sulle community di Acroyoga in Italia.
              </p>
            </section>

            <hr className="my-4 text-border" />

            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-database-lock" style={{ color: '#15803d' }}></i>
                2. Dati raccolti
              </h2>
              <p className="mb-3" style={{ color: '#334155' }}>
                AcroFinder non richiede la registrazione degli utenti e non raccoglie dati personali tramite il sito.
              </p>
              <p className="mb-2" style={{ color: '#334155' }}>
                Attraverso il modulo di contribuzione possono essere inviati volontariamente dati e informazioni relativi alle community, come:
              </p>
              <ul className="list-unstyled ps-3 d-flex flex-column gap-2 mb-0" style={{ color: '#334155' }}>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check2-circle small" style={{ color: '#15803d' }}></i>
                  <span>Nome community</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check2-circle small" style={{ color: '#15803d' }}></i>
                  <span>Link social</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check2-circle small" style={{ color: '#15803d' }}></i>
                  <span>Informazioni su jam e corsi</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check2-circle small" style={{ color: '#15803d' }}></i>
                  <span>Eventuali informazioni aggiuntive inserite dall'utente</span>
                </li>
              </ul>
            </section>

            <hr className="my-4 text-border" />

            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-gear-fill" style={{ color: '#15803d' }}></i>
                3. Finalità del trattamento
              </h2>
              <p className="mb-2" style={{ color: '#334155' }}>I dati inviati vengono utilizzati esclusivamente per:</p>
              <ul className="list-unstyled ps-3 d-flex flex-column gap-2 mb-0" style={{ color: '#334155' }}>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-arrow-right-short fs-5" style={{ color: '#15803d' }}></i>
                  <span>Verificare e aggiornare le informazioni presenti sulla piattaforma;</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-arrow-right-short fs-5" style={{ color: '#15803d' }}></i>
                  <span>Migliorare il servizio;</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-arrow-right-short fs-5" style={{ color: '#15803d' }}></i>
                  <span>Mantenere aggiornata la mappa delle community.</span>
                </li>
              </ul>
            </section>

            <hr className="my-4 text-border" />

            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-globe2" style={{ color: '#15803d' }}></i>
                4. Pubblicazione delle informazioni
              </h2>
              <p className="mb-2" style={{ color: '#334155' }}>
                Le informazioni relative alle community possono essere pubblicate sul sito allo scopo di rendere il servizio disponibile agli utenti.
              </p>
              <p className="fw-semibold mb-0" style={{ color: '#1e293b' }}>
                Gli utenti sono invitati a inviare solamente informazioni che possono essere condivise pubblicamente.
              </p>
            </section>

            <hr className="my-4 text-border" />

            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-box-seam-fill" style={{ color: '#15803d' }}></i>
                5. Servizi di terze parti
              </h2>
              <p className="mb-0" style={{ color: '#334155' }}>
                Il modulo di contribuzione è gestito tramite <strong>Tally</strong>. Per informazioni sul trattamento dei dati effettuato da Tally si rimanda alla loro privacy policy.
              </p>
            </section>

            <hr className="my-4 text-border" />

            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-person-check-fill" style={{ color: '#15803d' }}></i>
                6. Diritti dell'utente
              </h2>
              <p className="mb-0" style={{ color: '#334155' }}>
                Gli utenti possono richiedere la modifica o la rimozione delle informazioni inviate contattando il progetto tramite i canali disponibili.
              </p>
            </section>

            <hr className="my-4 text-border" />

            <section>
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-arrow-repeat" style={{ color: '#15803d' }}></i>
                7. Aggiornamenti
              </h2>
              <p className="mb-0" style={{ color: '#334155' }}>
                Questa privacy policy può essere aggiornata nel tempo.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy

import BackButton from "../components/BackButton"
import SEO from "../components/SEO"

function Terms() {
  return (
    <div className="container-fluid container-xl py-5">

      <SEO
        title="Termini di utilizzo | AcroFinder"
        description="Consulta i termini di utilizzo di AcroFinder."
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
              Condizioni di Servizio
            </span>
            <h1 className="display-5 fw-bold text-dark mb-2">Termini di utilizzo</h1>
          </div>

          {/* Contenuto principale */}
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
            
            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-info-circle-fill" style={{ color: '#15803d' }}></i>
                1. Descrizione del servizio
              </h2>
              <p className="mb-0" style={{ color: '#334155' }}>
                AcroFinder è una piattaforma informativa che raccoglie informazioni pubbliche relative alle community di Acroyoga.
              </p>
            </section>

            <hr className="my-4 text-border" />

            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-patch-check-fill" style={{ color: '#15803d' }}></i>
                2. Accuratezza delle informazioni
              </h2>
              <p className="mb-2" style={{ color: '#334155' }}>
                Le informazioni vengono raccolte tramite segnalazioni della community.
              </p>
              <p className="mb-0" style={{ color: '#334155' }}>
                Nonostante gli sforzi per mantenere i dati aggiornati, AcroFinder non garantisce la correttezza o disponibilità continua delle informazioni pubblicate.
              </p>
            </section>

            <hr className="my-4 text-border" />

            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-people-fill" style={{ color: '#15803d' }}></i>
                3. Responsabilità delle community
              </h2>
              <p className="mb-2" style={{ color: '#334155' }}>
                Le community sono responsabili dei contenuti e dei link forniti.
              </p>
              <p className="mb-0" style={{ color: '#334155' }}>
                AcroFinder non organizza direttamente jam o corsi presenti sulla piattaforma.
              </p>
            </section>

            <hr className="my-4 text-border" />

            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-journal-text" style={{ color: '#15803d' }}></i>
                4. Utilizzo del servizio
              </h2>
              <p className="mb-2" style={{ color: '#334155' }}>
                Gli utenti possono utilizzare le informazioni presenti sul sito per trovare community e attività di Acroyoga.
              </p>
              <p className="fw-semibold mb-0" style={{ color: '#1e293b' }}>
                È responsabilità dell'utente verificare eventuali modifiche direttamente con la community interessata.
              </p>
            </section>

            <hr className="my-4 text-border" />

            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-code-slash" style={{ color: '#15803d' }}></i>
                5. Contenuti e proprietà
              </h2>
              <p className="mb-0" style={{ color: '#334155' }}>
                Il progetto, il design e il codice di AcroFinder sono protetti secondo le condizioni applicabili.
              </p>
            </section>

            <hr className="my-4 text-border" />

            <section className="mb-4">
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-sliders" style={{ color: '#15803d' }}></i>
                6. Modifiche al servizio
              </h2>
              <p className="mb-0" style={{ color: '#334155' }}>
                Il progetto può essere modificato, aggiornato o sospeso in qualsiasi momento.
              </p>
            </section>

            <hr className="my-4 text-border" />

            <section>
              <h2 className="h5 fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-envelope-paper-fill" style={{ color: '#15803d' }}></i>
                7. Contatti
              </h2>
              <p className="mb-0" style={{ color: '#334155' }}>
                Per richieste relative a dati, rimozioni o aggiornamenti è possibile utilizzare i contatti indicati sul sito.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms

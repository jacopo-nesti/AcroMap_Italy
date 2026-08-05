function Contribute() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="display-6 fw-bold mb-3">Contribuisci al Progetto</h2>
          <p className="lead text-muted mb-4">
            AcroMap Italy vive grazie alla community! Aiutaci a rendere la mappa sempre più completa e aggiornata.
          </p>

          <div className="row g-4 text-start my-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <i className="bi bi-geo-alt-fill text-success fs-2 mb-2"></i>
                <h3 className="h5 fw-bold">Aggiungi una Città</h3>
                <p className="text-muted small mb-0">
                  La tua città o il tuo gruppo non sono ancora presenti sulla mappa? Segnalaceli!
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <i className="bi bi-calendar-event-fill text-success fs-2 mb-2"></i>
                <h3 className="h5 fw-bold">Aggiorna Jam o Corsi</h3>
                <p className="text-muted small mb-0">
                  Un orario è cambiato o c'è una nuova jam al parco? Faccelo sapere per aggiornare i dati.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <i className="bi bi-bug-fill text-success fs-2 mb-2"></i>
                <h3 className="h5 fw-bold">Segnala un Errore</h3>
                <p className="text-muted small mb-0">
                  Hai trovato un link non funzionante o una posizione sbagliata su Google Maps?
                </p>
              </div>
            </div>
          </div>

          <a 
            href="https://tally.so/r/zxAD88" 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-success btn-lg px-4 mt-3 fw-semibold shadow-sm"
          >
            Compila il modulo di segnalazione
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contribute
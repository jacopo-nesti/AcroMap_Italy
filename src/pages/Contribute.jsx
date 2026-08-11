function Contribute() {
  return (
    <div className="pt-5 pb-0">
      <div className="row justify-content-center text-center">
        <div className="col-12">
          <h2 className="display-6 fw-bold mb-3">Contribuisci al Progetto</h2>
          
          <p className="lead text-muted mb-4">
            AcroMap Italy vive grazie alla community! Aiutaci a rendere il sito sempre più completo e aggiornato
          </p>
        </div>
      </div>

      {/* Griglia delle Card */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="row g-4 text-start my-2">
            <div className="col-md-4">
              <div className="card h-100 border border-light-subtle shadow-sm rounded-4 p-4 bg-white">
                <i className="bi bi-geo-alt-fill text-success fs-2 mb-3"></i>
                <h3 className="h5 fw-bold mb-2">Aggiungi una Città</h3>
                <p className="text-muted mb-0">
                  La tua città o il tuo gruppo non sono ancora presenti? Segnalaceli!
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border border-light-subtle shadow-sm rounded-4 p-4 bg-white">
                <i className="bi bi-calendar-event-fill text-success fs-2 mb-3"></i>
                <h3 className="h5 fw-bold mb-2">Aggiorna Jam o Corsi</h3>
                <p className="text-muted mb-0">
                  Un orario è cambiato o c'è una nuova jam al parco? Faccelo sapere per aggiornare i dati.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border border-light-subtle shadow-sm rounded-4 p-4 bg-white">
                <i className="bi bi-bug-fill text-success fs-2 mb-3"></i>
                <h3 className="h5 fw-bold mb-2">Segnala un Errore</h3>
                <p className="text-muted mb-0">
                  Hai trovato un link non funzionante o una posizione sbagliata su Google Maps?
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-4 pt-1">
            <a 
              href="https://tally.so/r/zxAD88" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-success btn-lg px-4 fw-semibold shadow-sm"
            >
              Compila il modulo di segnalazione
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contribute
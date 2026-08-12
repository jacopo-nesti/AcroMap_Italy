const CARDS = [
  { icon: "geo-alt-fill", title: "Aggiungi una Città", text: "La tua città o il tuo gruppo non sono ancora presenti? Segnalaceli!" },
  { icon: "calendar-event-fill", title: "Aggiorna Jam o Corsi", text: "Un orario è cambiato o c'è una nuova jam al parco? Faccelo sapere per aggiornare i dati." },
  { icon: "bug-fill", title: "Segnala un Errore", text: "Hai trovato un link non funzionante o una posizione sbagliata su Google Maps?" }
]

export default function Contribute() {
  return (
    <div className="container py-5 text-center">
      <span className="badge bg-success-subtle text-success mb-2 px-3 py-2 rounded-pill fw-semibold">
        Partecipa
      </span>
      <h1 className="display-5 fw-bold text-dark mb-3">
        Contribuisci al Progetto
      </h1>
      <p className="lead text-muted mx-auto mb-4" style={{ maxWidth: '700px' }}>
        AcroMap Italy vive grazie alla community! Aiutaci a rendere il sito sempre più completo e aggiornato.
      </p>

      <div className="row g-4 text-start justify-content-center mb-4">
        {CARDS.map((item, idx) => (
          <div key={idx} className="col-md-4">
            <div className="card h-100 border border-light-subtle shadow-sm rounded-4 p-4 bg-white">
              <i className={`bi bi-${item.icon} text-success fs-2 mb-3`} />
              <h2 className="h5 fw-bold text-dark mb-2">{item.title}</h2>
              <p className="text-muted small mb-0">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <a 
        href="https://tally.so/r/zxAD88" 
        target="_blank" 
        rel="noreferrer" 
        className="btn btn-success btn-lg px-4 rounded-pill fw-semibold shadow-sm"
      >
        Compila il modulo di segnalazione &rarr;
      </a>
    </div>
  )
}
import SEO from "../components/SEO"

const CARDS = [
  { icon: "geo-alt-fill", title: "Aggiungi una Città", text: "La tua città o il tuo gruppo non sono ancora presenti? Segnalaceli!" },
  { icon: "calendar-event-fill", title: "Aggiorna Jam o Corsi", text: "Un orario è cambiato o c'è una nuova jam al parco? Faccelo sapere per aggiornare i dati." },
  { icon: "bug-fill", title: "Segnala un Errore", text: "Hai trovato un link non funzionante o una posizione sbagliata su Google Maps?" }
]

export default function Contribute() {
  return (
    <div className="container py-5 text-center">

      <SEO
        title="Contribuisci | AcroFinder"
        description="Segnala una community, una jam, un corso o un'informazione da aggiornare e aiuta AcroFinder a crescere."
      />
      
      <span 
        className="badge mb-2 px-3 py-2 rounded-pill fw-semibold text-white"
        style={{ backgroundColor: '#15803d' }}
      >
        Partecipa
      </span>
      
      <h1 className="display-5 fw-bold text-dark mb-3">
        Contribuisci al Progetto
      </h1>
      <p className="lead mx-auto mb-4" style={{ maxWidth: '700px', color: '#475569' }}>
        AcroMap Italy vive grazie alla community! Aiutaci a rendere il sito sempre più completo e aggiornato.
      </p>

      <div className="row g-4 text-start justify-content-center mb-4">
        {CARDS.map((item, idx) => (
          <div key={idx} className="col-md-4">
            <div className="card h-100 border border-light-subtle shadow-sm rounded-4 p-4 bg-white">
              <i 
                className={`bi bi-${item.icon} fs-2 mb-3`} 
                style={{ color: '#15803d' }} 
              />
              <h2 className="h5 fw-bold text-dark mb-2">{item.title}</h2>
              <p className="small mb-0" style={{ color: '#475569' }}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <a 
        href="https://tally.so/r/zxAD88" 
        target="_blank" 
        rel="noreferrer" 
        className="btn btn-success btn-lg px-4 rounded-pill fw-semibold shadow-sm"
        style={{ backgroundColor: '#15803d', borderColor: '#15803d' }}
      >
        Compila il modulo di segnalazione &rarr;
      </a>
    </div>
  )
}
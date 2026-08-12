import { Link } from "react-router"

function OrganizerCallout() {
  return (
    <section className="text-center py-2">
      <span 
        className="badge mb-2 px-3 py-2 rounded-pill fw-semibold text-white"
        style={{ backgroundColor: '#15803d' }}
      >
        Per gli Organizzatori
      </span>
      <h2 className="h3 fw-bold text-dark mb-2">
        Sei un organizzatore?
      </h2>
      <p className="small mx-auto mb-4" style={{ color: '#475569', maxWidth: '520px' }}>
        Aiuta a mantenere AcroMap Italy aggiornato. Aggiungi il tuo gruppo, segnala una nuova jam o aggiorna gli orari dei corsi.
      </p>
      <Link 
        to="/contribute" 
        className="btn btn-success btn-lg rounded-pill px-4 fw-semibold shadow-sm fs-6"
      >
        Contribuisci al progetto &rarr;
      </Link>
    </section>
  )
}

export default OrganizerCallout
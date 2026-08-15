import { Link } from "react-router"

function OrganizerCallout() {
  return (
    <section className="organizer-callout">
      <div className="organizer-callout__header">
        <span className="organizer-callout__icon" aria-hidden="true">
          <i className="bi bi-leaf-fill" />
        </span>
        <h2 className="organizer-callout__title">
          Aiutaci a mantenere AcroFinder aggiornato
        </h2>
      </div>

      <p className="organizer-callout__description">
        Segnala nuove community, eventi o correzioni. La tua collaborazione fa crescere la mappa!
      </p>

      <Link to="/contribute" className="organizer-callout__button">
        <span>Contribuisci ora</span>
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </Link>
    </section>
  )
}

export default OrganizerCallout

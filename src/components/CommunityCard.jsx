function CommunityCard({ community, isOpen, onToggle, controlsId }) {
  const jamsCount = community.jams?.length || 0
  const coursesCount = community.courses?.length || 0

  return (
    <article className={`city-community-card ${isOpen ? "city-community-card--open" : ""}`}>
      <span className="city-community-card__icon" aria-hidden="true">
        <i className="bi bi-people-fill"></i>
      </span>

      <div className="city-community-card__body">
        <h3>{community.name}</h3>
        {community.description && <p>{community.description}</p>}

        <div className="city-community-card__meta">
          <span>
            <i className="bi bi-calendar-event" aria-hidden="true"></i>
            {jamsCount} Jam
          </span>
          <span>
            <i className="bi bi-mortarboard" aria-hidden="true"></i>
            {coursesCount} {coursesCount === 1 ? "Corso attivo" : "Corsi attivi"}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={controlsId}
        className="city-community-card__toggle"
      >
        <span>{isOpen ? "Mostra meno" : "Scopri di più"}</span>
        <i className={`bi bi-arrow-${isOpen ? "up" : "right"}`} aria-hidden="true"></i>
      </button>
    </article>
  )
}

export default CommunityCard

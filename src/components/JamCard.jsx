const seasonLabels = {
  summer: {
    label: "Estivo",
    icon: "bi-sun-fill",
    className: "city-activity-card__season--summer",
  },
  winter: {
    label: "Invernale",
    icon: "bi-snow",
    className: "city-activity-card__season--winter",
  },
  "all-year": {
    label: "Tutto l'anno",
    icon: "bi-arrow-repeat",
    className: "city-activity-card__season--all-year",
  },
}

function JamCard({ jam }) {
  if (!jam) return null

  const hasTime = jam.start_time || jam.end_time
  
  const season = seasonLabels[jam.season]

  return (
    <article className="city-activity-card city-activity-card--jam">
      {(jam.day || hasTime) && (
        <div className="city-activity-card__heading">
          {jam.day && <p className="city-activity-card__day">{jam.day}</p>}
          <i className="bi bi-calendar-event" aria-hidden="true"></i>
        </div>
      )}

      {hasTime && (
        <p className="city-activity-card__time">
          <i className="bi bi-clock" aria-hidden="true"></i>
          {jam.start_time}{jam.end_time ? ` – ${jam.end_time}` : ""}
        </p>
      )}

      {season && (
        <div className="city-activity-card__season-wrap">
          <span
            className={`city-activity-card__season ${season.className}`}
          >
            <i className={`bi ${season.icon}`} aria-hidden="true"></i>
            {season.label}
          </span>

          {jam.season_notes && (
            <span className="city-activity-card__season-notes">
              {jam.season_notes}
            </span>
          )}
        </div>
      )}

      {jam.location && (
        <p className="city-activity-card__meta">
          <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
          {jam.location}
        </p>
      )}

      {jam.maps_url && (
        <a
          href={jam.maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="city-activity-card__maps"
          aria-label={`Apri ${jam.location || "il luogo della Jam"} su Google Maps in una nuova scheda`}
        >
          <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
          Apri su Maps
        </a>
      )}

      {jam.notes && (
        <p className="city-activity-card__notes">{jam.notes}</p>
      )}
    </article>
  )
}

export default JamCard

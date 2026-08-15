function JamCard({ jam }) {
  if (!jam) return null

  const hasTime = jam.start_time || jam.end_time

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

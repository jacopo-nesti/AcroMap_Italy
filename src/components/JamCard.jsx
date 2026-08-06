function JamCard({ jam }) {
  if (!jam) return null

  const hasTime = jam.start_time || jam.end_time

  return (
    <div className="card border-0 shadow-sm p-3 bg-white rounded-3">
      {/* Giorno ed Orario */}
      {(jam.day || hasTime) && (
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
          {jam.day && (
            <span className="fw-bold text-dark d-flex align-items-center gap-1">
              <i className="bi bi-calendar-event text-success"></i>
              {jam.day}
            </span>
          )}
          {hasTime && (
            <span className="badge bg-success-subtle text-success border border-success-subtle fw-medium">
              <i className="bi bi-clock me-1"></i>
              {jam.start_time}{jam.end_time ? ` - ${jam.end_time}` : ''}
            </span>
          )}
        </div>
      )}

      {/* Luogo */}
      {jam.location && (
        <div className="small text-secondary mb-2">
          <i className="bi bi-geo-alt-fill text-success me-1"></i>
          {jam.location}
        </div>
      )}

      {/* Link Maps */}
      {jam.maps_url && (
        <div className="mt-1">
          <a
            href={jam.maps_url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-link text-success p-0 text-decoration-none fw-semibold small d-inline-flex align-items-center gap-1"
          >
            Visualizza su Google Maps
            <i className="bi bi-box-arrow-up-right small"></i>
          </a>
        </div>
      )}

      {/* Note */}
      {jam.notes && (
        <div className="text-muted small mt-2 border-top pt-2 fst-italic">
          <i className="bi bi-info-circle me-1"></i>
          {jam.notes}
        </div>
      )}
    </div>
  )
}

export default JamCard
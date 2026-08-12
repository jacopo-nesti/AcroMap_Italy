function JamCard({ jam }) {
  if (!jam) return null

  const hasTime = jam.start_time || jam.end_time

  return (
    <div className="card border border-light-subtle shadow-sm p-3 bg-white rounded-3 mb-2">
      {/* Giorno e Orari */}
      {(jam.day || hasTime) && (
        <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
          {jam.day && (
            <span className="fw-semibold text-dark d-inline-flex align-items-center gap-1 small bg-light px-2 py-1 rounded border">
              <i className="bi bi-calendar-event-fill text-success"></i>
              <span className="text-capitalize" style={{ color: '#0f291e' }}>{jam.day}</span>
            </span>
          )}
          {hasTime && (
            <span className="fw-semibold text-dark d-inline-flex align-items-center gap-1 small bg-white px-2 py-1 rounded border">
              <i className="bi bi-clock-fill text-success"></i>
              <span>{jam.start_time}{jam.end_time ? ` - ${jam.end_time}` : ''}</span>
            </span>
          )}
        </div>
      )}

      {/* Luogo */}
      {jam.location && (
        <div className="text-secondary mb-1 d-flex align-items-center gap-2 small">
          <i className="bi bi-geo-alt-fill text-success"></i>
          <span className="fw-medium">{jam.location}</span>
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
            <i className="bi bi-box-arrow-up-right x-small"></i>
          </a>
        </div>
      )}

      {/* Note */}
      {jam.notes && (
        <div className="text-muted small mt-2 border-top pt-2 fst-italic">
          <i className="bi bi-info-circle me-1 text-success"></i>
          {jam.notes}
        </div>
      )}
    </div>
  )
}

export default JamCard
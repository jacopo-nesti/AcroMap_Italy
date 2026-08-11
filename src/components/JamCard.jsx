function JamCard({ jam }) {
  if (!jam) return null

  const hasTime = jam.start_time || jam.end_time

  return (
    <div className="card border-0 shadow-sm p-4 bg-white rounded-4">

      {(jam.day || hasTime) && (
        <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
          {jam.day && (
            <span className="fw-bold text-dark d-inline-flex align-items-center gap-2 fs-6 bg-light px-3 py-2 rounded-3 border">
              <i className="bi bi-calendar-event-fill text-success fs-5"></i>
              <span className="text-capitalize" style={{ color: '#0f291e' }}>{jam.day}</span>
            </span>
          )}
          {hasTime && (
            <span className="fw-bold text-dark d-inline-flex align-items-center gap-2 fs-6 bg-white px-3 py-2 rounded-3 border">
              <i className="bi bi-clock-fill text-success fs-5"></i>
              <span>{jam.start_time}{jam.end_time ? ` - ${jam.end_time}` : ''}</span>
            </span>
          )}
        </div>
      )}

      {/* Luogo */}
      {jam.location && (
        <div className="text-secondary mb-2 d-flex align-items-center gap-2 fs-6">
          <i className="bi bi-geo-alt-fill text-success fs-5"></i>
          <span className="fw-medium">{jam.location}</span>
        </div>
      )}

      {/* Link Maps */}
      {jam.maps_url && (
        <div className="mt-2">
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
        <div className="text-muted small mt-3 border-top pt-3 fst-italic">
          <i className="bi bi-info-circle me-1 text-success"></i>
          {jam.notes}
        </div>
      )}
    </div>
  )
}

export default JamCard
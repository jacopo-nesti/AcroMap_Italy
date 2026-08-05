function JamCard({ jam }) {
  if (!jam) return null

  return (
    <div className="card border-0 shadow-sm p-3 bg-white rounded-3 mb-2">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="fw-bold text-dark">
          <i className="bi bi-calendar-event text-success me-2"></i>
          {jam.day}
        </div>
        {(jam.start_time || jam.end_time) && (
          <span className="badge bg-light text-muted border fw-normal">
            <i className="bi bi-clock me-1"></i>
            {jam.start_time} - {jam.end_time}
          </span>
        )}
      </div>

      {jam.location && (
        <div className="small text-secondary mb-2">
          <i className="bi bi-geo-alt-fill text-danger me-1"></i>
          {jam.location}
        </div>
      )}

      {jam.maps_url && (
        <div className="mb-1">
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
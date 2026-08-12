function CourseCard({ course }) {
  if (!course) return null

  const teachersList = Array.isArray(course.teachers)
    ? course.teachers.join(', ')
    : course.teachers

  const hasTime = course.start_time || course.end_time

  return (
    <div className="card border border-light-subtle shadow-sm p-3 bg-white rounded-3 mb-2">
      {/* Nome Corso + Badge Livello */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
        {course.name && (
          <h4 className="h6 fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: '#0f291e' }}>
            {course.name}
            {course.level && (
              <span className="badge bg-success text-white rounded-pill px-2 py-1 x-small fw-medium">
                {course.level}
              </span>
            )}
          </h4>
        )}
        {!course.name && course.level && (
          <span className="badge bg-success text-white rounded-pill px-2 py-1 x-small fw-medium">
            {course.level}
          </span>
        )}
      </div>

      {/* Insegnanti */}
      {teachersList && (
        <div className="d-flex align-items-center gap-2 text-dark small mb-2">
          <i className="bi bi-person-badge-fill text-success fs-6"></i>
          <span className="fw-semibold" style={{ color: '#0f291e' }}>Insegnanti:</span>
          <span className="text-secondary fw-medium">{teachersList}</span>
        </div>
      )}

      {/* Giorno e Orari */}
      {(course.day || hasTime) && (
        <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
          {course.day && (
            <span className="fw-semibold text-dark d-inline-flex align-items-center gap-1 small bg-light px-2 py-1 rounded border">
              <i className="bi bi-calendar-event-fill text-success"></i>
              <span className="text-capitalize" style={{ color: '#0f291e' }}>{course.day}</span>
            </span>
          )}
          {hasTime && (
            <span className="fw-semibold text-dark d-inline-flex align-items-center gap-1 small bg-white px-2 py-1 rounded border">
              <i className="bi bi-clock-fill text-success"></i>
              <span>{course.start_time}{course.end_time ? ` - ${course.end_time}` : ''}</span>
            </span>
          )}
        </div>
      )}

      {/* Luogo */}
      {course.location && (
        <div className="text-secondary mb-1 d-flex align-items-center gap-2 small">
          <i className="bi bi-geo-alt-fill text-success"></i>
          <span className="fw-medium">{course.location}</span>
        </div>
      )}

      {/* Link Maps */}
      {course.maps_url && (
        <div className="mt-1">
          <a
            href={course.maps_url}
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
      {course.notes && (
        <div className="text-muted small mt-2 border-top pt-2 fst-italic">
          <i className="bi bi-info-circle me-1 text-success"></i>
          {course.notes}
        </div>
      )}
    </div>
  )
}

export default CourseCard
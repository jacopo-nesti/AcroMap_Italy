function CourseCard({ course }) {
  if (!course) return null

  const teachersList = Array.isArray(course.teachers)
    ? course.teachers.join(', ')
    : course.teachers

  const hasTime = course.start_time || course.end_time

  return (
    <div className="card border-0 shadow-sm p-4 bg-white rounded-4">
      {/* Nome Corso + Badge Livello */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        {course.name && (
          <h4 className="h5 fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: '#0f291e' }}>
            {course.name}
            {course.level && (
              <span className="badge bg-success text-white rounded-pill px-3 py-1 small fw-medium">
                {course.level}
              </span>
            )}
          </h4>
        )}
        {!course.name && course.level && (
          <span className="badge bg-success text-white rounded-pill px-3 py-1 small fw-medium">
            {course.level}
          </span>
        )}
      </div>

      {/* Insegnanti */}
      {teachersList && (
        <div className="d-flex align-items-center gap-2 text-dark fs-6 mb-3">
          <i className="bi bi-person-badge-fill text-success fs-5"></i>
          <span className="fw-semibold" style={{ color: '#0f291e' }}>Insegnanti:</span>
          <span className="text-secondary fw-medium">{teachersList}</span>
        </div>
      )}

      {(course.day || hasTime) && (
        <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
          {course.day && (
            <span className="fw-bold text-dark d-inline-flex align-items-center gap-2 fs-6 bg-light px-3 py-2 rounded-3 border">
              <i className="bi bi-calendar-event-fill text-success fs-5"></i>
              <span className="text-capitalize" style={{ color: '#0f291e' }}>{course.day}</span>
            </span>
          )}
          {hasTime && (
            <span className="fw-bold text-dark d-inline-flex align-items-center gap-2 fs-6 bg-white px-3 py-2 rounded-3 border">
              <i className="bi bi-clock-fill text-success fs-5"></i>
              <span>{course.start_time}{course.end_time ? ` - ${course.end_time}` : ''}</span>
            </span>
          )}
        </div>
      )}

      {/* Luogo */}
      {course.location && (
        <div className="text-secondary mb-2 d-flex align-items-center gap-2 fs-6">
          <i className="bi bi-geo-alt-fill text-success fs-5"></i>
          <span className="fw-medium">{course.location}</span>
        </div>
      )}

      {/* Link Maps */}
      {course.maps_url && (
        <div className="mt-2">
          <a
            href={course.maps_url}
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
      {course.notes && (
        <div className="text-muted small mt-3 border-top pt-3 fst-italic">
          <i className="bi bi-info-circle me-1 text-success"></i>
          {course.notes}
        </div>
      )}
    </div>
  )
}

export default CourseCard
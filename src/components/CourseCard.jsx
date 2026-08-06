function CourseCard({ course }) {
  if (!course) return null

  const teachersList = Array.isArray(course.teachers)
    ? course.teachers.join(', ')
    : course.teachers

  const hasTime = course.start_time || course.end_time

  return (
    <div className="card border-0 shadow-sm p-3 bg-white rounded-3">
      {/* Nome Corso + Badge Livello Affiancato */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
        {course.name && (
          <h4 className="h6 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
            {course.name}
            {course.level && (
              <span className="badge bg-success text-white rounded-pill px-2 py-1 small fw-normal">
                {course.level}
              </span>
            )}
          </h4>
        )}
        {!course.name && course.level && (
          <span className="badge bg-success text-white rounded-pill px-2 py-1 small fw-normal">
            {course.level}
          </span>
        )}
      </div>

      {/* Insegnanti */}
      {teachersList && (
        <div className="small text-muted mb-2">
          <i className="bi bi-person-badge text-success me-1"></i>
          <strong>Insegnanti:</strong> {teachersList}
        </div>
      )}

      {/* Giorno e Orario */}
      {(course.day || hasTime) && (
        <div className="d-flex flex-wrap gap-3 text-secondary small mb-2">
          {course.day && (
            <div>
              <i className="bi bi-calendar3 text-success me-1"></i>
              {course.day}
            </div>
          )}
          {hasTime && (
            <div>
              <i className="bi bi-clock text-success me-1"></i>
              {course.start_time}{course.end_time ? ` - ${course.end_time}` : ''}
            </div>
          )}
        </div>
      )}

      {/* Luogo */}
      {course.location && (
        <div className="small text-secondary mb-2">
          <i className="bi bi-geo-alt-fill text-success me-1"></i>
          {course.location}
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
            <i className="bi bi-box-arrow-up-right small"></i>
          </a>
        </div>
      )}

      {/* Note */}
      {course.notes && (
        <div className="text-muted small mt-2 border-top pt-2 fst-italic">
          <i className="bi bi-info-circle me-1"></i>
          {course.notes}
        </div>
      )}
    </div>
  )
}

export default CourseCard
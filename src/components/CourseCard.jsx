function CourseCard({ course }) {
  if (!course) return null

  const teachersList = Array.isArray(course.teachers)
    ? course.teachers.join(', ')
    : course.teachers

  return (
    <div className="card border-0 shadow-sm p-3 bg-white rounded-3 mb-2">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h4 className="h6 fw-bold text-dark mb-0">{course.name}</h4>
        {course.level && (
          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">
            {course.level}
          </span>
        )}
      </div>

      {teachersList && (
        <div className="small text-muted mb-2">
          <i className="bi bi-person-badge text-success me-1"></i>
          <strong>Insegnanti:</strong> {teachersList}
        </div>
      )}

      <div className="d-flex flex-wrap gap-3 text-secondary small mb-2">
        {course.day && (
          <div>
            <i className="bi bi-calendar3 text-success me-1"></i>
            {course.day}
          </div>
        )}
        {(course.start_time || course.end_time) && (
          <div>
            <i className="bi bi-clock text-success me-1"></i>
            {course.start_time} - {course.end_time}
          </div>
        )}
      </div>

      {course.location && (
        <div className="small text-secondary mb-2">
          <i className="bi bi-geo-alt-fill text-danger me-1"></i>
          {course.location}
        </div>
      )}

      {course.maps_url && (
        <div className="mb-1">
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
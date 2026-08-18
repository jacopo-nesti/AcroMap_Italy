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

function CourseCard({ course }) {
  if (!course) return null

  const teachersList = Array.isArray(course.teachers)
    ? course.teachers.join(', ')
    : course.teachers

  const hasTime = course.start_time || course.end_time

  const season = seasonLabels[course.season]

  return (
    <article className="city-activity-card city-activity-card--course">
      <div className="city-activity-card__heading">
        <div>
          {course.day && <p className="city-activity-card__day">{course.day}</p>}
          {course.name && <h5>{course.name}</h5>}
        </div>
        <i className="bi bi-mortarboard" aria-hidden="true"></i>
      </div>

      {hasTime && (
        <p className="city-activity-card__time">
          <i className="bi bi-clock" aria-hidden="true"></i>
          {course.start_time}{course.end_time ? ` – ${course.end_time}` : ""}
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

          {course.season_notes && (
            <span className="city-activity-card__season-notes">
              {course.season_notes}
            </span>
          )}
        </div>
      )}

      {course.level && <span className="city-activity-card__level">{course.level}</span>}

      {teachersList && (
        <p className="city-activity-card__meta">
          <i className="bi bi-person-badge" aria-hidden="true"></i>
          {teachersList}
        </p>
      )}

      {course.location && (
        <p className="city-activity-card__meta">
          <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
          {course.location}
        </p>
      )}

      {course.maps_url && (
        <a
          href={course.maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="city-activity-card__maps"
          aria-label={`Apri ${course.location || "il luogo del corso"} su Google Maps in una nuova scheda`}
        >
          <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
          Apri su Maps
        </a>
      )}

      {course.notes && (
        <p className="city-activity-card__notes">{course.notes}</p>
      )}
    </article>
  )
}

export default CourseCard

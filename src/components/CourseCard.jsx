function CourseCard({ course }) {

    return (
        <li className="course-card">

            <p><strong>Corso:</strong> {course.name}</p>
            <p><strong>Livello:</strong> {course.level}</p>
            <p><strong>Giorno:</strong> {course.day}</p>
            <p><strong>Orario:</strong> {course.start_time} - {course.end_time}</p>
            <p><strong>Luogo:</strong> {course.location}</p>

            {course.maps_url && (
                <p><strong>Mappa:</strong> <a href={course.maps_url} target="_blank" rel="noreferrer">Vedi su Google Maps</a></p>
            )}

            {course.notes && (
                <p><strong>Informazioni aggiuntive:</strong> {course.notes}</p>
            )}

        </li>
    )
}

export default CourseCard
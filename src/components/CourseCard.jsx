function CourseCard({ course }) {

    return (
        <li className="course-card list-group-item mb-2">

            <p className="mb-1"><strong>Corso:</strong> {course.name}</p>
            <p className="mb-1"><strong>Livello:</strong> {course.level}</p>
            <p className="mb-1"><strong>Giorno:</strong> {course.day}</p>
            <p className="mb-1"><strong>Orario:</strong> {course.start_time} - {course.end_time}</p>
            <p className="mb-1"><strong>Luogo:</strong> {course.location}</p>

            {course.maps_url && (
                <p className="mb-1"><strong>Mappa:</strong> <a href={course.maps_url} target="_blank" rel="noreferrer" className="link-primary">Vedi su Google Maps</a></p>
            )}

            {course.notes && (
                <p className="mb-0"><strong>Informazioni aggiuntive:</strong> {course.notes}</p>
            )}

        </li>
    )
}

export default CourseCard
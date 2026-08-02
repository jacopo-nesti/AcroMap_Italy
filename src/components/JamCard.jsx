function JamCard({ jam }) {

    return (
        <li className="jam-card">
            <p><strong>Giorno:</strong> {jam.day}</p>
            <p><strong>Orario:</strong> {jam.start_time} - {jam.end_time}</p>
            <p><strong>Luogo:</strong> {jam.location}</p>

            {jam.maps_url && (
                <p><strong>Mappa:</strong> <a href={jam.maps_url} target="_blank" rel="noreferrer">Vedi su Google Maps</a></p>
            )}

            {jam.notes && (
                <p><strong>Informazioni aggiuntive:</strong> {jam.notes}</p>
            )}
        </li>
    )
}

export default JamCard
function JamCard({ jam }) {

    return (
        <li className="jam-card list-group-item mb-2">
            <p className="mb-1"><strong>Giorno:</strong> {jam.day}</p>
            <p className="mb-1"><strong>Orario:</strong> {jam.start_time} - {jam.end_time}</p>
            <p className="mb-1"><strong>Luogo:</strong> {jam.location}</p>

            {jam.maps_url && (
                <p className="mb-1"><strong>Mappa:</strong> <a href={jam.maps_url} target="_blank" rel="noreferrer" className="link-primary">Vedi su Google Maps</a></p>
            )}

            {jam.notes && (
                <p className="mb-0"><strong>Informazioni aggiuntive:</strong> {jam.notes}</p>
            )}
        </li>
    )
}

export default JamCard
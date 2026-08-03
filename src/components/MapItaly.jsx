function MapItaly({ cities }) {

    return (
        <div>
            <h2>Mappa Italia</h2>

            {cities.map((city) => (
                <p key={city.id}>
                    {city.name}
                </p>
            ))}

        </div>
    )
}

export default MapItaly
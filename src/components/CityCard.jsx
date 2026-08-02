function CityCard({ city }) {

    return (
        <div>

            <h2>{city.name}</h2>

            <p>Regione: {city.region}</p>

            <p>Provincia: {city.province}</p>

        </div>
    )
}

export default CityCard
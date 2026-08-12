import { Link } from "react-router"

function SearchResults({ search, filteredCities, setSelectedCity }) {

    if (!search.trim()) {
        return null
    }

    if (filteredCities.length === 0) {
        return (
            <p className="fw-bold text-dark mt-3">
                Nessuna città trovata.
            </p>
        )
    }

    return (
        <div className="list-group mb-4">

            {filteredCities.map((city) => (

                <Link
                    key={city.id}
                    to={`/city/${city.slug}`}
                    className="list-group-item list-group-item-action"
                    onClick={() => setSelectedCity(city)}
                >
                    <strong>{city.name}</strong>
                    <br />
                    <small>{city.region}</small>
                </Link>

            ))}

        </div>
    )

}

export default SearchResults
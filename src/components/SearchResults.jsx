import { Link } from "react-router"

function SearchResults({ search, filteredCities, setSelectedCity }) {

    if (!search.trim()) {
        return null
    }

    if (filteredCities.length === 0) {
        return (
            <p className="home-search__empty">
                Nessuna città trovata.
            </p>
        )
    }

    return (
        <div className="home-search__list" aria-label="Risultati della ricerca">

            {filteredCities.map((city) => (

                <Link
                    key={city.id}
                    to={`/city/${city.slug}`}
                    className="home-search__result"
                    onClick={() => setSelectedCity(city)}
                >
                    <span className="home-search__result-city">{city.name}</span>
                    <span className="home-search__result-region">{city.region}</span>
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                </Link>

            ))}

        </div>
    )

}

export default SearchResults

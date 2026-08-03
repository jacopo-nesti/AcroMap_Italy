import { useEffect, useState } from "react"
import { getCities } from "../services/cityService"
import { Link } from "react-router"
import CityCard from "../components/CityCard"

function CitiesPage() {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadCities() {
            try {
                setIsLoading(true)
                setError(null)
                const data = await getCities()
                setCities(data)
            } catch(error) {
                setError(
                    "Si è verificato un errore inaspettato."
                )
            } finally {
                setIsLoading(false)
            }
        }
        loadCities()
            
    }, [])

    if (isLoading) {
        return <p>Caricamento città in corso...</p>
    }

    if (error) {
        return <p>Errore: {error}</p>
    }

    return (
        <div className="container mt-4">
            <h1>Città disponibili</h1>
            <div className="row">
            {cities.map(city => (
                <div key={city.id} className="col-md-4 mb-3">
                    <Link to={`/city/${city.slug}`} className="text-decoration-none">
                        <CityCard city={city} />
                    </Link>
                </div>
            ))}
            </div>
        </div>
    )
}

export default CitiesPage
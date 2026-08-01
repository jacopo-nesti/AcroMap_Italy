import { useEffect, useState } from "react"
import { getCities } from "../services/cityService"
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
        <div>
            <h1>Città disponibili</h1>
            {cities.map(city => (
                <CityCard key={city.id} city={city} />
            ))}
        </div>
    )
}

export default CitiesPage
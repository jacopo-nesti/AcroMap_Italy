import { useEffect, useState } from "react"
import { getCities } from "../services/cityService"
import Hero from "../components/Hero"
import MapItaly from "../components/MapItaly"

function HomePage() {

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
            } catch {
                setError("Errore per il caricamento della città")
            } finally {
                setIsLoading(false)
            }
        }

        loadCities()

    }, [])

    if(isLoading) {
        return <p>Caricamento...</p>
    }

    if(error) {
        return <p>{error}</p>
    }

    return (
        <main>
            <Hero />

            <MapItaly cities={cities}/>

        </main>
    )
}

export default HomePage
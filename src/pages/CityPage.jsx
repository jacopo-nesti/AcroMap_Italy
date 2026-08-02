import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCityBySlug } from "../services/cityService"
import CommunityCard from "../components/CommunityCard"

function CityPage() {

    const { slug } = useParams()
    const [city, setCity] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadCity() {
            try {
                setIsLoading(true)
                setError(null)
                const data = await getCityBySlug(slug)
                setCity(data)
            } catch (error) {
                setError("Si è verificato un errore.")
            } finally {
                setIsLoading(false)
            }
        }

        loadCity()

    }, [slug])

    if (isLoading) {
    return <p>Caricamento...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!city) {
        return <p>Città non trovata.</p>;
    }

    return (
        <main>

            <h1>{city.name}</h1>

            <p>Regione: {city.region}</p>

            <p>Provincia: {city.province}</p>

            <h2>Community presenti</h2>

            {city.communities.map((community) => (
                <CommunityCard key={community.id} community={community}/>
            ))}

        </main>
    )
}

export default CityPage
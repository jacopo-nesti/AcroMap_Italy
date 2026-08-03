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
    return <p className="text-center mt-5">Caricamento...</p>;
    }

    if (error) {
        return <p className="text-center mt-5 text-danger">{error}</p>;
    }

    if (!city) {
        return <p className="text-center mt-5">Città non trovata.</p>;
    }

    return (
        <main className="container py-4">

            <h1>{city.name}</h1>

            <p className="mb-1">Regione: {city.region}</p>

            <p>Provincia: {city.province}</p>

            <h2 className="mt-4 mb-3">Community presenti</h2>

            {city.communities.map((community) => (
                <CommunityCard key={community.id} community={community}/>
            ))}

        </main>
    )
}

export default CityPage
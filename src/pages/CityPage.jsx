import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCityBySlug } from "../services/cityService"

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

            <p>{city.description}</p>

            <h2>Jam</h2>

            <ul>
            {city.jams.map((jam, index) => (
                <li key={index}>
                <p><strong>Giorno:</strong> {jam.day}</p>
                <p><strong>Orario:</strong> {jam.time}</p>
                <p><strong>Luogo:</strong> {jam.location}</p>
                </li>
            ))}
            </ul>

        </main>
    )
}

export default CityPage
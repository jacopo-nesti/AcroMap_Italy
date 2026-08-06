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
      } catch (error) {
        setError("Si è verificato un errore inaspettato.")
      } finally {
        setIsLoading(false)
      }
    }
    loadCities()
  }, [])

  if (isLoading) {
    return <p className="text-center mt-5">Caricamento città in corso...</p>
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">Errore: {error}</p>
  }

  return (
    <div className="container mt-4 text-center">
      <h1 className="mb-4">Città</h1>

      <div className="row justify-content-center">
        {cities.map((city) => (
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
import { useEffect, useState } from "react"
import { getCities } from "../services/cityService"
import MapItaly from "../components/MapItaly"
import SearchBar from "../components/SearchBar"
import SearchResults from "./SearchResults"

function CommunityFinder() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [selectedCity, setSelectedCity] = useState(null)

  // Caricamento dati iniziali
  useEffect(() => {
    async function loadCities() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getCities()
        setCities(data)
      } catch {
        setError("Errore per il caricamento delle città")
      } finally {
        setIsLoading(false)
      }
    }

    loadCities()
  }, [])

  // Filtraggio delle città in base alla ricerca
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  )

  // Selezione automatica se c'è 1 solo risultato
  useEffect(() => {
    if (filteredCities.length === 1) {
      setSelectedCity(filteredCities[0])
    } else {
      setSelectedCity(null)
    }
  }, [search])

  // Gestione degli stati di caricamento ed errore
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger my-3">{error}</div>
  }

  return (
    <section className="container my-4">

      <div className="row g-4 align-items-start">
        
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 p-3 bg-light h-100">
            <h5 className="fw-bold mb-3">🔎 Cerca una città</h5>

            <div className="input-group mb-3">
              <SearchBar search={search} setSearch={setSearch} />
              {search && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearch("")}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="search-results-wrapper" style={{ maxHeight: '450px', overflowY: 'auto' }}>
              <SearchResults
                search={search}
                filteredCities={filteredCities}
                setSelectedCity={setSelectedCity}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="rounded-3 overflow-hidden shadow-sm border">
            <MapItaly cities={filteredCities} selectedCity={selectedCity} />
          </div>
        </div>

      </div>
    </section>
  )
}

export default CommunityFinder
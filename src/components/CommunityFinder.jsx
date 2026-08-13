import { createContext, useContext, useEffect, useState } from "react"
import { getCities } from "../services/cityService"

const CommunityFinderContext = createContext()

export function useCommunityFinderContext() {
  return useContext(CommunityFinderContext)
}

export function CommunityFinder({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [selectedCity, setSelectedCity] = useState(null)

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

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <CommunityFinderContext.Provider
      value={{
        cities,
        isLoading,
        error,
        search,
        setSearch,
        filteredCities,
        selectedCity,
        setSelectedCity,
      }}
    >
      {children}
    </CommunityFinderContext.Provider>
  )
}

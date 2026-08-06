import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCityBySlug } from "../services/cityService"
import CommunityCard from "../components/CommunityCard"

function CityPage() {
  const { slug } = useParams()
  const [city, setCity] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Traccia la community attualmente aperta (null = tutte chiuse)
  const [openCommunityId, setOpenCommunityId] = useState(null)

  useEffect(() => {
    async function loadCity() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getCityBySlug(slug)
        setCity(data)
      } catch (err) {
        setError("Si è verificato un errore nel caricamento della città.")
      } finally {
        setIsLoading(false)
      }
    }
    loadCity()
  }, [slug])

  const handleToggleCommunity = (id) => {
    setOpenCommunityId((prevId) => (prevId === id ? null : id))
  }

  if (isLoading) return <p className="text-center mt-5 text-muted">Caricamento...</p>
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>
  if (!city) return <p className="text-center mt-5 text-muted">Città non trovata.</p>

  const communitiesCount = city.communities?.length || 0

  return (
    <main className="container py-4">
      {/* Header Centrato */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark display-5 mb-1">{city.name}</h1>
        <p className="text-muted mb-3 fs-5">
          {city.region}{city.province ? `, ${city.province}` : ''}
        </p>
        <h2 className="h5 fw-bold text-dark border-bottom pb-3 d-inline-block px-4">
          Community presenti ({communitiesCount})
        </h2>
      </div>

      {/* Lista Community */}
      <div className="row g-3">
        {city.communities?.map((community) => {
          const isOpen = openCommunityId === community.id
          return (
            <div 
              key={community.id} 
              className={isOpen ? "col-12" : "col-12 col-md-6 col-lg-4"}
            >
              <CommunityCard 
                community={community} 
                isOpen={isOpen} 
                onToggle={() => handleToggleCommunity(community.id)} 
              />
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default CityPage
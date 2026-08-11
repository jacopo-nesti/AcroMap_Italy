import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCityBySlug } from "../services/cityService"
import CommunityCard from "../components/CommunityCard"
import BackButton from "../components/BackButton"

function CityPage() {
  const { slug } = useParams()
  const [city, setCity] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
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
    <div className="min-vh-100 py-4 bg-light">
      <main className="container">
        
        {/* Barra superiore: Componente BackButton + Segnala Errore */}
        <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
          <div className="d-flex align-items-center gap-2">
            <BackButton />

            <a
              href="https://tally.so/r/zxAD88"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-secondary border-0 bg-transparent text-secondary rounded-3 d-inline-flex align-items-center gap-2 px-3 py-2 small fw-medium text-decoration-none"
            >
              <i className="bi bi-exclamation-triangle"></i>
              <span className="d-none d-md-inline">Segnala un errore</span>
            </a>
          </div>
        </div>

        {/* Header Città */}
        <div className="mb-4 text-start">
          <div 
            className="fw-bold small text-uppercase tracking-wider mb-1"
            style={{ color: "#14532d" }}
          >
            {city.region}{city.province ? ` / ${city.province}` : ''}
          </div>

          <h1 className="fw-bold display-4 mb-1" style={{ color: "#0f172a" }}>
            {city.name}
          </h1>

          <p className="fw-medium fs-5 mb-0" style={{ color: "#334155" }}>
            {communitiesCount} community present{communitiesCount === 1 ? 'e' : 'i'}
          </p>
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
    </div>
  )
}

export default CityPage
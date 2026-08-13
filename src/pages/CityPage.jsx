import { useState } from "react"
import { useParams } from "react-router"
import CommunityCard from "../components/CommunityCard"
import BackButton from "../components/BackButton"
import SEO from "../components/SEO"
import { useCommunityFinderContext } from "../components/CommunityFinder"

function CityPage() {
  const { slug } = useParams()
  const { cities, isLoading, error } = useCommunityFinderContext()
  const [openCommunityId, setOpenCommunityId] = useState(null)

  const city = cities.find((city) => city.slug === slug)

  const handleToggleCommunity = (id) => {
    setOpenCommunityId((prevId) => (prevId === id ? null : id))
  }

  if (isLoading) return <p className="text-center mt-5 text-muted">Caricamento...</p>
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>
  if (!city) return <p className="text-center mt-5 text-muted">Città non trovata.</p>

  const communitiesCount = city.communities?.length || 0

  return (
    <div className="min-vh-100 py-4 bg-light">

      <SEO
        title={`Acroyoga a ${city.name} | Community, Jam e Corsi | AcroFinder`}
        description={`Scopri le community di Acroyoga a ${city.name}, le jam e i corsi disponibili.`}
      />

      <div className="container">
        
        {/* Barra superiore: Componente BackButton + Segnala Errore */}
        <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
          <div className="d-flex align-items-center gap-2">
            <BackButton />

            <a
              href="https://tally.so/r/zxAD88"
              target="_blank"
              rel="noreferrer"
              aria-label="Segnala un errore (apre in una nuova scheda)"
              className="report-error-link btn border-0 bg-transparent rounded-3 d-inline-flex align-items-center gap-2 px-3 py-2 small fw-medium text-decoration-none"
              style={{ color: "#334155" }}
            >
              <i
                className="bi bi-exclamation-triangle"
                aria-hidden="true"
                style={{ color: "#b45309" }}
              ></i>
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

      </div>
    </div>
  )
}

export default CityPage

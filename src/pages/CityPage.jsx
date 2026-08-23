import { useEffect, useRef, useState } from "react"
import { useParams, useSearchParams } from "react-router"
import CommunityCard from "../components/CommunityCard"
import CommunityDetails from "../components/CommunityDetails"
import CityHero from "../components/CityHero"
import BackButton from "../components/BackButton"
import SEO from "../components/SEO"
import { useCommunityFinderContext } from "../components/CommunityFinder"
import { getCityIcon } from "../utils/cityPresentation"

function CityPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const communityParam = searchParams.get("community")
  const { cities, isLoading, error } = useCommunityFinderContext()
  const [openCommunityId, setOpenCommunityId] = useState(null)
  const detailsRef = useRef(null)
  const shouldScrollToDetails = useRef(false)

  const city = cities.find((city) => city.slug === slug)

  useEffect(() => {
    if (!city || !communityParam) {
      setOpenCommunityId(null)
      return
    }

    const communityId = Number(communityParam)

    const communityExists = city.communities?.some(
      (community) => community.id === communityId
    )

    if (communityExists) {
      setOpenCommunityId(communityId)
      shouldScrollToDetails.current = true
    } else {
      setOpenCommunityId(null)
    }
  }, [slug, communityParam, city])

  const handleToggleCommunity = (id) => {
    setOpenCommunityId((prevId) => {
      const nextId = prevId === id ? null : id
      shouldScrollToDetails.current = nextId !== null
      return nextId
    })
  }

  useEffect(() => {
    if (!openCommunityId || !shouldScrollToDetails.current || !detailsRef.current) return

    shouldScrollToDetails.current = false
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    detailsRef.current.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    })
  }, [openCommunityId])

  if (isLoading) return <p className="text-center mt-5 text-muted">Caricamento...</p>
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>
  if (!city) return <p className="text-center mt-5 text-muted">Città non trovata.</p>

  const communities = city.communities || []
  const communitiesCount = communities.length
  const jamsCount = communities.reduce((total, community) => total + (community.jams?.length || 0), 0)
  const coursesCount = communities.reduce((total, community) => total + (community.courses?.length || 0), 0)
  const hasSingleCommunity = communitiesCount === 1
  const selectedCommunity = hasSingleCommunity
    ? communities[0]
    : communities.find((community) => community.id === openCommunityId)
  const selectedPanelId = selectedCommunity
    ? `community-details-${city.slug}-${selectedCommunity.id}`
    : undefined

  return (
    <div className="city-page">

      <SEO
        title={`Acroyoga a ${city.name} | Community, Jam e Corsi | AcroFinder`}
        description={`Scopri le community di Acroyoga a ${city.name}, le jam e i corsi disponibili.`}
        canonical={`https://acrofinder.it/city/${city.slug}`}
      />

      <div className="container city-page__container">
        
        {/* Barra superiore: Componente BackButton + Segnala Errore */}
        <div className="city-page__toolbar">
          <div className="d-flex align-items-center gap-2">
            <BackButton />

            <a
              href="https://tally.so/r/zxAD88"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Segnala un errore (apre in una nuova scheda)"
              className="report-error-link city-page__report-link"
            >
              <i className="bi bi-exclamation-triangle" aria-hidden="true"></i>
              <span className="d-none d-md-inline">Segnala un errore</span>
            </a>
          </div>
        </div>

        <CityHero
          city={city}
          communitiesCount={communitiesCount}
          jamsCount={jamsCount}
          coursesCount={coursesCount}
          iconClass={getCityIcon(city)}
        />

        <section
          className={`city-communities${hasSingleCommunity ? " city-communities--single" : ""}`}
          aria-label={`Community a ${city.name}`}
        >
          {communitiesCount === 0 ? (
            <p className="city-communities__empty">Nessuna community disponibile al momento.</p>
          ) : hasSingleCommunity ? (
            <CommunityDetails community={selectedCommunity} panelId={selectedPanelId} />
          ) : (
            <>
              <div className="row g-3 city-communities__summaries">
                {communities.map((community) => {
                  const isOpen = openCommunityId === community.id
                  const panelId = `community-details-${city.slug}-${community.id}`

                  return (
                    <div key={community.id} className="col-12 col-md-6 col-xl-4">
                      <CommunityCard
                        community={community}
                        isOpen={isOpen}
                        onToggle={() => handleToggleCommunity(community.id)}
                        controlsId={panelId}
                      />
                    </div>
                  )
                })}
              </div>

              {selectedCommunity && (
                <CommunityDetails ref={detailsRef} community={selectedCommunity} panelId={selectedPanelId} />
              )}
            </>
          )}
        </section>

      </div>
    </div>
  )
}

export default CityPage

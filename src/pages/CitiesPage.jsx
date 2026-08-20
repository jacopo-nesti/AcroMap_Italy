import { useEffect, useState, useMemo, useRef, Fragment } from "react"
import RegionCard from "../components/RegionCard"
import RegionCitiesList from "../components/RegionCitiesList"
import SEO from "../components/SEO"
import { useCommunityFinderContext } from "../components/CommunityFinder"
import communityHeroDesktop from "../assets/images/community-regions-hero-desktop.webp"
import communityHeroTablet from "../assets/images/community-regions-hero-tablet.webp"
import communityHeroMobile from "../assets/images/community-regions-hero-mobile.webp"

function CitiesPage() {
  const { cities, isLoading, error } = useCommunityFinderContext()
  const [openRegion, setOpenRegion] = useState(null)

  const listRef = useRef(null)

  // Auto-scroll alla sezione espansa
  useEffect(() => {
    if (openRegion && listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [openRegion])

  // Raggruppamento e ordinamento con useMemo
  const groupedCities = useMemo(() => {
    return cities.reduce((acc, city) => {
      const region = city.region || "Altre Regioni"
      if (!acc[region]) acc[region] = []
      acc[region].push(city)
      return acc
    }, {})
  }, [cities])

  const sortedRegions = useMemo(() => Object.keys(groupedCities).sort(), [groupedCities])

  const toggleRegion = (regionName) => {
    setOpenRegion((prev) => (prev === regionName ? null : regionName))
  }

  if (isLoading) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
        <p className="mt-3" style={{ color: '#475569' }}>Caricamento città in corso...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="alert alert-danger d-inline-block px-4 py-3 rounded-4 shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="community-page">
      
      <SEO
        title="Community di Acroyoga in Italia | AcroFinder"
        description="Esplora le community di Acroyoga in Italia organizzate per regione e città."
        canonical="https://acrofinder.it/community"
      />

      <section className="community-intro" aria-labelledby="community-page-title">
        <div className="container-fluid container-xl">
          <div className="row align-items-center g-0">
            <div className="col-12 col-md-6 community-intro__copy">
              <span className="community-intro__badge">
                <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                Esplora le community in Italia
              </span>
              <h1 id="community-page-title" className="community-intro__title">
                <span className="community-intro__title-line">Città e Community</span>
                <span className="community-intro__title-line">per Regione</span>
              </h1>
              <p className="community-intro__subtitle">
                Clicca su una regione per visualizzare le città disponibili.
              </p>
            </div>

            <div className="col-12 col-md-6 community-intro__visual" aria-hidden="true">
              <picture className="community-intro__picture">
                <source
                  media="(min-width: 1200px)"
                  srcSet={communityHeroDesktop}
                  width="1600"
                  height="600"
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={communityHeroTablet}
                  width="1200"
                  height="600"
                />
                <img
                  className="community-intro__image"
                  src={communityHeroMobile}
                  alt=""
                  width="800"
                  height="600"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <section className="community-regions" aria-label="Regioni disponibili">
        <div className="container-fluid container-xl">
          <div className="row g-3 g-xl-4">
            {sortedRegions.map((regionName) => (
              <Fragment key={regionName}>
                <div className="col-12 col-md-6 col-xl-3">
                  <RegionCard
                    regionName={regionName}
                    regionCities={groupedCities[regionName]}
                    isOpen={openRegion === regionName}
                    onToggle={() => toggleRegion(regionName)}
                    controlsId={`region-${encodeURIComponent(regionName)}-cities`}
                  />
                </div>

                {openRegion === regionName && (
                  <div className="col-12">
                    <RegionCitiesList
                      ref={listRef}
                      regionName={regionName}
                      cities={groupedCities[regionName]}
                      onClose={() => setOpenRegion(null)}
                      id={`region-${encodeURIComponent(regionName)}-cities`}
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CitiesPage
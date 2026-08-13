import { useEffect, useState, useMemo, useRef } from "react"
import RegionCard from "../components/RegionCard"
import RegionCitiesList from "../components/RegionCitiesList"
import SEO from "../components/SEO"
import { useCommunityFinderContext } from "../components/CommunityFinder"

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
    <div className="container-fluid container-xl py-5">

      <SEO
        title="Community di Acroyoga in Italia | AcroFinder"
        description="Esplora le community di Acroyoga in Italia organizzate per regione e città."
      />

      <div className="text-center mb-5">
        <span 
          className="badge mb-2 px-3 py-2 rounded-pill fw-semibold text-white"
          style={{ backgroundColor: '#15803d' }}
        >
          Esplora le community in Italia
        </span>
        <h1 className="display-5 fw-bold text-dark mb-2">Città e Community per Regione</h1>
        <p className="lead mx-auto" style={{ maxWidth: "600px", color: '#475569' }}>
          Clicca su una regione per visualizzare le città disponibili.
        </p>
      </div>

      <div className="row g-3">
        {sortedRegions.map((regionName) => (
          <div key={regionName} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <RegionCard
              regionName={regionName}
              regionCities={groupedCities[regionName]}
              isOpen={openRegion === regionName}
              onToggle={() => toggleRegion(regionName)}
              controlsId={`region-${encodeURIComponent(regionName)}-cities`}
            />
          </div>
        ))}
      </div>

      {openRegion && (
        <RegionCitiesList
          ref={listRef}
          regionName={openRegion}
          cities={groupedCities[openRegion]}
          onClose={() => setOpenRegion(null)}
          id={`region-${encodeURIComponent(openRegion)}-cities`}
        />
      )}
    </div>
  )
}

export default CitiesPage

import MapItaly from "../components/MapItaly"
import BackButton from "../components/BackButton"
import { useCommunityFinderContext } from "../components/CommunityFinder"
import SEO from "../components/SEO"

function MapPage() {
  const { cities } = useCommunityFinderContext()

  return (
    <div className="container pt-2 pb-4">

      <SEO
        title="Mappa delle community di Acroyoga in Italia | AcroFinder"
        description="Esplora sulla mappa le community di Acroyoga presenti in tutta Italia e scopri dove praticare."
      />

      <div className="mb-2">
        <BackButton />
      </div>

      <div className="text-center mb-4">
        <span 
          className="badge mb-2 px-3 py-2 rounded-pill fw-semibold text-white"
          style={{ backgroundColor: '#15803d' }}
        >
          Esplora l'Italia
        </span>
        
        <h1 className="display-5 fw-bold text-dark mb-3">
          Mappa delle Community
        </h1>
        <p className="lead mx-auto mb-4" style={{ maxWidth: '700px', color: '#475569' }}>
          Visualizza tutte le community e i punti d'incontro sulla mappa interattiva.
        </p>
      </div>

      {/* Container Mappa */}
      <div className="rounded-4 overflow-hidden shadow-sm border border-light-subtle" style={{ height: '70vh' }}>
        <MapItaly cities={cities} />
      </div>
    </div>
  )
}

export default MapPage
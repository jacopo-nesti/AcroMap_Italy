import MapItaly from "../components/MapItaly"
import BackButton from "../components/BackButton"
import { useCommunityFinderContext } from "../components/CommunityFinder"

function MapPage() {
  const { cities } = useCommunityFinderContext()

  return (
    <div className="container pt-2 pb-4">
      <div className="mb-2">
        <BackButton />
      </div>

      <div className="text-center mb-4">
        <span className="badge bg-success-subtle text-success mb-2 px-3 py-2 rounded-pill fw-semibold">
          Esplora l'Italia
        </span>
        <h1 className="display-5 fw-bold text-dark mb-3">
          Mappa delle Community
        </h1>
        <p className="lead text-muted mx-auto mb-4" style={{ maxWidth: '700px' }}>
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
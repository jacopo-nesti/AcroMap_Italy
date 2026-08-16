import MapItaly from "../components/MapItaly"
import { useCommunityFinderContext } from "../components/CommunityFinder"
import SEO from "../components/SEO"

function MapPage() {
  const { cities, isLoading, error } = useCommunityFinderContext()

  return (
    <main className="map-page">
      <SEO
        title="Mappa delle community di Acroyoga in Italia | AcroFinder"
        description="Esplora sulla mappa le community di Acroyoga presenti in tutta Italia e scopri dove praticare."
      />

      <div className="container map-page__container">

        <header className="map-page__header">
          <span className="map-page__badge">
            <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
            Community in tutta Italia
          </span>

          <h1 className="map-page__title">
            Mappa delle Community
          </h1>

          <p className="map-page__subtitle">
            Esplora la mappa e scopri community, jam e corsi in tutta Italia.
          </p>
        </header>

        {isLoading ? (
          <div className="map-page__loading">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <>
            <div className="map-page__map">
              <MapItaly cities={cities} />
            </div>

            <p className="map-page__hint">
              <i className="bi bi-cursor" aria-hidden="true"></i>
              Seleziona un marker per scoprire la community e vedere jam e corsi disponibili.
            </p>
          </>
        )}

      </div>
    </main>
  )
}

export default MapPage
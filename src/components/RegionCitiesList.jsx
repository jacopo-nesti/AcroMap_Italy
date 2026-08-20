import { Link } from "react-router"
import { forwardRef } from "react"
import CityCard from "./CityCard"
import { getRegionIcon } from "./regionPresentation"

const RegionCitiesList = forwardRef(({ regionName, cities = [], onClose, id }, ref) => {
  const headingId = `${id}-heading`
  const regionIcon = getRegionIcon(regionName)

  const regionSlug = regionName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")

  return (
    <section
      id={id}
      ref={ref}
      className="region-cities-panel"
      aria-labelledby={headingId}
    >
      <header className="region-cities-panel__header">
        <div className="region-cities-panel__identity">
          <span className="region-cities-panel__icon" aria-hidden="true">
            <i className={`bi ${regionIcon}`}></i>
          </span>

          <div className="region-cities-panel__intro">
            <div className="region-cities-panel__title-row">
              <h3 id={headingId} className="region-cities-panel__title">
                {regionName}
              </h3>

              <span className="region-cities-panel__count">
                {cities.length} città
              </span>

              <Link
                to={`/region/${regionSlug}/jams`}
                className="region-cities-panel__jams-link"
              >
                <i className="bi bi-people-fill" aria-hidden="true"></i>
                <span>Scopri tutte le jam</span>
                <i className="bi bi-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>

            <p className="region-cities-panel__description">
              Esplora le città e trova le community vicino a te.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="region-cities-panel__close"
          onClick={onClose}
          aria-label={`Chiudi le città della regione ${regionName}`}
        >
          <span>Chiudi</span>
          <i className="bi bi-x-lg" aria-hidden="true"></i>
        </button>
      </header>

      {cities.length === 0 ? (
        <div className="region-cities-panel__empty">
          <i className="bi bi-info-circle" aria-hidden="true"></i>
          Nessuna città disponibile per questa regione al momento.
        </div>
      ) : (
        <div className="row g-3 g-lg-4">
          {cities.map((city) => (
            <div key={city.id || city.slug} className="col-12 col-md-6 col-lg-4">
              <CityCard city={city} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
})

RegionCitiesList.displayName = "RegionCitiesList"

export default RegionCitiesList

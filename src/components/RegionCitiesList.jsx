import { forwardRef } from "react"
import CityCard from "./CityCard"

const RegionCitiesList = forwardRef(({ regionName, cities = [], onClose }, ref) => {
  return (
    <div ref={ref} className="mt-4 p-3 p-md-4 bg-light rounded-4 shadow-sm border">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h5 fw-bold text-dark mb-0">
          Città in <span className="text-success">{regionName}</span> ({cities.length})
        </h3>
        <button
          className="btn btn-sm btn-outline-secondary rounded-circle"
          onClick={onClose}
          aria-label="Chiudi"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {cities.length === 0 ? (
        <div className="text-center py-4 text-muted">
          <i className="bi bi-info-circle fs-4 d-block mb-2 text-secondary"></i>
          Nessuna città disponibile per questa regione al momento.
        </div>
      ) : (
        <div className="row g-2">
          {cities.map((city) => (
            <div key={city.id || city.slug} className="col-6 col-md-4 col-lg-3">
              <div className="h-100">
                <CityCard city={city} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})

RegionCitiesList.displayName = "RegionCitiesList"

export default RegionCitiesList
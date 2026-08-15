import { useMemo } from "react"
import { getRegionArticle, getRegionIcon } from "./regionPresentation"

function RegionCard({ regionName, regionCities, isOpen, onToggle, controlsId }) {
  // Calcolo totale di Jam e Corsi con useMemo
  const { totalJams, totalCourses } = useMemo(() => {
    return regionCities.reduce(
      (acc, city) => {
        const jams = city.communities?.reduce((jAcc, comm) => jAcc + (comm.jams?.length || 0), 0) || 0
        const courses = city.communities?.reduce((cAcc, comm) => cAcc + (comm.courses?.length || 0), 0) || 0
        return {
          totalJams: acc.totalJams + jams,
          totalCourses: acc.totalCourses + courses,
        }
      },
      { totalJams: 0, totalCourses: 0 }
    )
  }, [regionCities])

  const cityCount = regionCities.length
  const regionIcon = getRegionIcon(regionName)
  const regionArticle = getRegionArticle(regionName)

  return (
    <article className={`region-card h-100 ${isOpen ? "region-card--selected" : ""}`}>
      <button
        onClick={onToggle}
        className="region-card__button"
        type="button"
        aria-expanded={isOpen}
        aria-controls={controlsId}
      >
        <div className="region-card__header">
          <span className="region-card__region-icon" aria-hidden="true">
            <i className={`bi ${regionIcon}`}></i>
          </span>
          <h2 className="region-card__title">{regionName}</h2>
          <span className="region-card__city-count">
            {cityCount} {cityCount === 1 ? 'città' : 'città'}
          </span>
        </div>

        <div className="region-card__metadata">
          <span className="region-card__meta">
            <i className="bi bi-calendar-event" aria-hidden="true"></i>
            {totalJams} {totalJams === 1 ? 'Jam' : 'Jam'}
          </span>
          <span className="region-card__meta">
            <i className="bi bi-mortarboard" aria-hidden="true"></i>
            {totalCourses} {totalCourses === 1 ? 'Corso' : 'Corsi'}
          </span>
        </div>

        <span className="region-card__cta">
          Esplora {regionArticle}{regionName}
          <i className="bi bi-arrow-right" aria-hidden="true"></i>
        </span>
      </button>
    </article>
  )
}

export default RegionCard

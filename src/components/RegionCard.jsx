import { useMemo } from "react"

function RegionCard({ regionName, regionCities, isOpen, onToggle }) {
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

  return (
    <div
      className={`card rounded-4 h-100 transition-all ${
        isOpen
          ? 'border-success border-2 shadow'
          : 'border-1 border-light-subtle shadow-sm'
      }`}
      style={{
        backgroundColor: isOpen ? '#e8f5e9' : '#ffffff',
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <button
        onClick={onToggle}
        className={`btn region-card-button text-start p-3 d-flex flex-column justify-content-between border-0 shadow-none h-100 w-100 ${
          isOpen ? 'bg-transparent' : 'bg-white'
        }`}
        type="button"
        aria-expanded={isOpen}
      >
        <div className="d-flex align-items-center justify-content-between w-100 mb-3">
          <div className="d-flex align-items-center gap-2">
            <i className={`bi bi-geo-alt-fill fs-5 ${isOpen ? 'text-success' : 'text-secondary'}`}></i>
            <h2 className="h5 fw-bold text-dark mb-0">{regionName}</h2>
          </div>
          <span className={`badge rounded-pill px-2 py-1 small fw-semibold ${
            isOpen ? 'bg-success text-white' : 'bg-secondary-subtle text-dark'
          }`}>
            {cityCount} {cityCount === 1 ? 'città' : 'città'}
          </span>
        </div>

        <div className="d-flex flex-wrap gap-2 w-100 mt-auto">
          <span className="badge bg-white text-dark border px-2 py-1.5 rounded-pill fw-normal small shadow-sm">
            <i className="bi bi-calendar-event text-success me-1"></i>
            {totalJams} {totalJams === 1 ? 'Jam' : 'Jam'}
          </span>
          <span className="badge bg-white text-dark border px-2 py-1.5 rounded-pill fw-normal small shadow-sm">
            <i className="bi bi-mortarboard text-success me-1"></i>
            {totalCourses} {totalCourses === 1 ? 'Corso' : 'Corsi'}
          </span>
        </div>
      </button>
    </div>
  )
}

export default RegionCard
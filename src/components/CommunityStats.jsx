import { useCommunityFinderContext } from "./CommunityFinder"

function CommunityStats() {
  const { cities } = useCommunityFinderContext()

  const stats = [
    {
      label: "Community",
      value: cities.reduce((acc, c) => acc + (c.communities?.length || 0), 0),
    },
    {
      label: "Città",
      value: cities.length,
    },
    {
      label: "Regioni",
      value: new Set(cities.map((c) => c.region).filter(Boolean)).size,
    },
  ]

  return (
    <section className="col-12 text-center my-5">
      <h3 className="fw-bold mb-4">La community italiana, in numeri</h3>

      <div className="row justify-content-center align-items-center g-0">
        {stats.map(({ label, value }, index) => (
          <article 
            key={label} 
            className={`col-4 col-md-3 ${
              index < stats.length - 1 ? "border-end border-light-subtle" : ""
            }`}
          >
            <div className="d-flex flex-column align-items-center py-2 px-1">
              {/* Barretta orizzontale verde */}
              <div 
                className="bg-success mb-2" 
                style={{ width: "32px", height: "4px", borderRadius: "2px" }}
              ></div>

              {/* Numero grande */}
              <span className="display-3 fw-bold text-dark lh-1 mb-1">
                {value}
              </span>

              {/* Etichetta sotto */}
              <p className="text-muted small text-uppercase fw-semibold mb-0">
                {label}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CommunityStats
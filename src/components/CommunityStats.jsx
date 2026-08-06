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
    <section className="col-12 text-center my-4">
      <h3 className="fw-bold mb-4">La community italiana in numeri</h3>

      <div className="row justify-content-center g-4">
        {stats.map(({ label, value }) => (
          <article key={label} className="col-4 col-md-3">
            <div className="p-3 bg-white rounded-3 shadow-sm border">
              <h2 className="fw-bold text-success mb-0">{value}</h2>
              <p className="text-muted mb-0 small text-uppercase fw-semibold">
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
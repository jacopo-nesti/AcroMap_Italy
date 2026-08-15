import { useCommunityFinderContext } from "./CommunityFinder"

function CommunityStats() {
  const { cities } = useCommunityFinderContext()

  const stats = [
    {
      icon: "bi bi-people-fill",
      label: "Community",
      value: cities.reduce((acc, c) => acc + (c.communities?.length || 0), 0),
      description: "Gruppi attivi in tutta Italia",
    },
    {
      icon: "bi bi-geo-alt-fill",
      label: "Città",
      value: cities.length,
      description: "Coperte dalla nostra mappa",
    },
    {
      icon: "bi bi-map-fill",
      label: "Regioni",
      value: new Set(cities.map((c) => c.region).filter(Boolean)).size,
      description: "Coinvolte in AcroFinder",
    },
  ]

  return (
    <section className="community-stats" aria-label="Statistiche di AcroFinder">
      <div className="community-stats__grid">
        {stats.map(({ icon, label, value, description }) => (
          <article key={label} className="community-stat">
            <i className={`${icon} community-stat__icon`} aria-hidden="true" />
            <span className="community-stat__value">{value}</span>
            <h2 className="community-stat__label">{label}</h2>
            <p className="community-stat__description">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CommunityStats

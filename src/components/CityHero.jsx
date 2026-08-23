function CityHero({ city, communitiesCount, jamsCount, coursesCount, iconClass }) {
  const stats = [
    { icon: "bi-people-fill", value: communitiesCount, label: "Community" },
    { icon: "bi-calendar-event", value: jamsCount, label: "Jam" },
    { icon: "bi-mortarboard-fill", value: coursesCount, label: coursesCount === 1 ? "Corso attivo" : "Corsi attivi" },
  ]

  return (
    <header className="city-hero">
      <div className="city-hero__content">
        <p className="city-hero__eyebrow">
          <span>{city.region}</span>
          <span aria-hidden="true">/</span>
          <span>{city.name}</span>
        </p>

        <h1 className="city-hero__title">Community a {city.name}</h1>
        <p className="city-hero__region">
          <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
          {city.region}
        </p>

        <dl className="city-hero__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="city-hero__stat">
              <i className={`bi ${stat.icon} city-hero__stat-icon`} aria-hidden="true"></i>
              <div>
                <dt className="city-hero__stat-label">{stat.label}</dt>
                <dd className="city-hero__stat-value">{stat.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <div className="city-hero__visual" aria-hidden="true">
        <i className={`bi ${iconClass}`}></i>
      </div>
    </header>
  )
}

export default CityHero

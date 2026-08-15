import { Link } from "react-router"

function CityCard({ city }) {
  const communityCount = city.communities?.length || 0

  return (
    <Link
      to={`/city/${city.slug || city.name.toLowerCase()}`}
      className="region-city-card"
    >
      <span className="region-city-card__icon" aria-hidden="true">
        <i className="bi bi-geo-alt-fill"></i>
      </span>

      <div className="region-city-card__content">
        <h4 className="region-city-card__title">{city.name}</h4>
        <p className="region-city-card__count">
          {communityCount} community
        </p>
        <span className="region-city-card__cta">
          Esplora {city.name}
          <i className="bi bi-arrow-right" aria-hidden="true"></i>
        </span>
      </div>
    </Link>
  )
}

export default CityCard

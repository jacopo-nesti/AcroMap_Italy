function CityCard({ city }) {
  return (
    <div className="card h-100 shadow-sm hover-shadow style-clickable">
      <div className="card-body">
        <h5 className="card-title">{city.name}</h5>
        <p className="card-text text-muted">{city.region} - {city.province}</p>
      </div>
    </div>
  )
}

export default CityCard
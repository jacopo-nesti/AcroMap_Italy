import { Link } from 'react-router'

function CityCard({ city }) {
  return (
    <Link 
      to={`/citta/${city.slug || city.name.toLowerCase()}`}
      className="text-decoration-none"
    >
      <div 
        className="card h-100 border-0 shadow-sm rounded-4"
        style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 .5rem 1rem rgba(0,0,0,.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
        }}
      >
        <div className="card-body p-4 text-center">
          <i className="bi bi-pin-map-fill text-success fs-2 mb-2 d-block"></i>
          <h5 className="card-title fw-bold text-dark mb-1">{city.name}</h5>
          <p className="card-text text-muted small mb-0">
            {city.region} &bull; {city.province}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CityCard
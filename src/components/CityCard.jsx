import { Link } from 'react-router'

function CityCard({ city }) {
  const communityCount = city.communities?.length || 0

  return (
    <Link 
      to={`/city/${city.slug || city.name.toLowerCase()}`}
      className="text-decoration-none"
    >
      <div 
        className="card h-100 border-0 shadow-sm rounded-4 bg-white"
        style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 .4rem .8rem rgba(0,0,0,.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
        }}
      >
        <div className="card-body p-3 d-flex flex-column justify-content-between text-center">
          
          <div>
            <h5 className="card-title fw-bold text-dark mb-2 d-flex align-items-center justify-content-center gap-1">
              <i className="bi bi-geo-alt-fill text-success"></i>
              {city.name}
            </h5>

            <span className="badge bg-success-subtle text-success rounded-pill px-2 py-1 small fw-semibold">
              {communityCount} {communityCount === 1 ? 'community' : 'community'}
            </span>
          </div>

          <div className="d-flex align-items-center justify-content-center gap-1 mt-3 pt-2 border-top border-light">
            <span className="small text-success fw-semibold" style={{ fontSize: '0.85rem' }}>
              Esplora
            </span>
            <i className="bi bi-arrow-right text-success small"></i>
          </div>

        </div>
      </div>
    </Link>
  )
}

export default CityCard
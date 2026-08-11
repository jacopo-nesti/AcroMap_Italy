import { useRef, useEffect } from 'react'

function DetailSection({ title, icon, count, isOpen, onToggle, items, renderItem, emptyText }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [isOpen])

  return (
    <div className="col-12 col-md-6">
      <button
        type="button"
        onClick={onToggle}
        className={`btn w-100 py-3 px-3 rounded-3 text-center border transition-all mb-2 ${
          isOpen ? 'btn-success text-white shadow-sm' : 'btn-outline-success border-success-subtle bg-light text-success'
        }`}
        style={{ cursor: 'pointer' }}
      >
        <div className="fw-bold d-flex align-items-center justify-content-center gap-2">
          <i className={`bi bi-${icon}`}></i>
          <span>{title} ({count})</span>
        </div>
        <div className="small opacity-75 mt-1">
          <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
        </div>
      </button>

      {isOpen && (
        <div ref={ref} className="p-3 bg-light rounded-3 border border-success-subtle">
          <h6 className="fw-bold text-success mb-3 small text-uppercase tracking-wider">
            <i className={`bi bi-${icon} me-2`}></i>Elenco {title}
          </h6>
          {count > 0 ? (
            <div className="d-flex flex-column gap-2">
              {items.map(renderItem)}
            </div>
          ) : (
            <p className="text-muted small mb-0 text-center py-2">{emptyText}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default DetailSection
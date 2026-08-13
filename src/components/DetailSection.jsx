import { useId, useRef, useEffect } from 'react'

function DetailSection({ title, icon, count, isOpen, onToggle, items, renderItem, emptyText }) {
  const ref = useRef(null)
  const contentId = useId()

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
        aria-expanded={isOpen}
        aria-controls={contentId}
        className={`btn w-100 py-2 px-3 rounded-3 d-flex align-items-center justify-content-center position-relative border transition-all mb-2 ${
          isOpen ? 'btn-success text-white shadow-sm' : 'btn-outline-success border-success-subtle bg-light text-success'
        }`}
        style={{ cursor: 'pointer' }}
      >
        <div className="fw-semibold d-flex align-items-center gap-2 small">
          <i className={`bi bi-${icon}`} aria-hidden="true"></i>
          <span>{title} ({count})</span>
        </div>
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} small position-absolute end-0 me-3`} aria-hidden="true"></i>
      </button>

      {/* Sezione contenuti ad espansione */}
      {isOpen && (
        <div id={contentId} ref={ref} className="p-2 bg-light rounded-3 border border-success-subtle">
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

import { useNavigate } from 'react-router'

function BackButton({ label = "Indietro", onClick, className = "" }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`btn back-button btn-white bg-white border text-dark rounded-3 shadow-sm d-inline-flex align-items-center gap-2 px-3 py-2 fw-medium ${className}`}
      aria-label={label}
    >
      <i className="bi bi-arrow-left"></i>
      <span className="d-none d-sm-inline">{label}</span>
    </button>
  )
}

export default BackButton
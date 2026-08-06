import { useState } from "react"
import { Link } from "react-router"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          AcroMap Italy
        </Link>

        {/* Bottone Hamburger (visibile solo su mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu di navigazione */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/cities" className="nav-link" onClick={closeMenu}>
                Città
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contribute" className="nav-link" onClick={closeMenu}>
                Contribuisci
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/aboutus" className="nav-link" onClick={closeMenu}>
                Chi siamo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
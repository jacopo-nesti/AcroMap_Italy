import { useState } from "react"
import { Link, useLocation } from "react-router"
import logoImage from "../assets/logo/acrofinder-logo.png"

function Navbar({ isHomePage = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isCommunityPage = location.pathname === "/community"

  const closeMenu = () => setIsOpen(false)

  return (
    <nav
      className={`navbar navbar-expand-lg px-3 ${
        isHomePage
          ? "home-navbar position-absolute top-0 start-0 w-100"
          : isCommunityPage
            ? "community-navbar navbar-light"
            : "navbar-dark bg-dark"
      }`}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-3 text-decoration-none" onClick={closeMenu}>
          <img src={logoImage} alt="" className="home-navbar__logo" />
          <span className="home-navbar__brand">AcroFinder</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          aria-label={isOpen ? "Chiudi il menu di navigazione" : "Apri il menu di navigazione"}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="navbar-toggler-icon" aria-hidden="true"></span>
        </button>

        <div id="main-navigation" className={`collapse navbar-collapse justify-content-end ${isOpen ? "show" : ""}`}>
          <div className={`d-flex flex-column flex-lg-row align-items-lg-center gap-2 gap-lg-4 px-3 py-2 ${
            isHomePage ? "home-navbar__pill" : isCommunityPage ? "community-navbar__menu" : ""
          }`}>
            <Link
              to="/community"
              className={`nav-link ${isHomePage ? "home-navbar__link" : isCommunityPage ? "community-navbar__link community-navbar__link--active" : "text-white"}`}
              aria-current={isCommunityPage ? "page" : undefined}
              onClick={closeMenu}
            >
              Community
            </Link>
            <Link to="/map" className={`nav-link ${isHomePage ? "home-navbar__link" : isCommunityPage ? "community-navbar__link" : "text-white"}`} onClick={closeMenu}>
              Mappa
            </Link>
            <Link to="/aboutus" className={`nav-link ${isHomePage ? "home-navbar__link" : isCommunityPage ? "community-navbar__link" : "text-white"}`} onClick={closeMenu}>
              Chi siamo
            </Link>
            <Link to="/contribute" className={`btn btn-success ${isHomePage ? "home-navbar__cta" : isCommunityPage ? "community-navbar__cta" : ""}`} onClick={closeMenu}>
              Contribuisci
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

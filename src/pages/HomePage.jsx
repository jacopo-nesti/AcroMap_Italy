import CommunityFinderSearchBar from "../components/CommunityFinderSearchBar"
import CommunityStats from "../components/CommunityStats"
import FeatureHighlights from "../components/FeatureHighlights"
import OrganizerCallout from "../components/OrganizerCallout"
import SEO from "../components/SEO"
import { useCommunityFinderContext } from "../components/CommunityFinder"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import heroDesktopImage from "../assets/images/hero-acrofinder-desktop.webp"
import heroTabletImage from "../assets/images/hero-acrofinder-tablet.webp"
import heroMobileImage from "../assets/images/hero-acrofinder-mobile.webp"

function HomePage() {
  const { isLoading, error } = useCommunityFinderContext()
  const location = useLocation()

  const [highlightSearch, setHighlightSearch] = useState(false)

  useEffect(() => {
    if (location.hash !== "#home-search-target" || isLoading || error) return

    const searchTarget = document.getElementById("home-search-target")
    const searchInput = document.querySelector(".home-search__input")

    if (!searchTarget) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    searchTarget.scrollIntoView({
      behavior: prefersReducedMotion ? "instant" : "smooth",
      block: "center",
    })

    searchInput?.focus({ preventScroll: true })
  }, [location.hash, isLoading, error])

  const handleSearchClick = () => {
    const searchTarget = document.getElementById("home-search-target")
    const searchInput = document.querySelector(".home-search__input")

    if (!searchTarget) return

    searchTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })

    setHighlightSearch(true)

    setTimeout(() => {
      searchInput?.focus()
    }, 600)

    setTimeout(() => {
      setHighlightSearch(false)
    }, 2000)
  }

  return (
    <div className="home-page">

      <SEO
        title="AcroFinder - Trova community di Acroyoga in Italia"
        description="Trova community, jam e corsi di Acroyoga in tutta Italia. Cerca la tua città e scopri dove praticare vicino a te."
        canonical="https://acrofinder.it/"
      />

      <section className="home-hero position-relative overflow-hidden">
        <picture className="home-hero__picture">
          <source media="(min-width: 1400px)" srcSet={heroDesktopImage} />
          <source media="(min-width: 576px)" srcSet={heroTabletImage} />
          <img
            src={heroMobileImage}
            alt="Due persone che praticano acroyoga in un paesaggio italiano"
            className="home-hero__image"
            decoding="async"
            fetchPriority="high"
          />
        </picture>

        <div className="container home-hero__content position-relative">
          <div className="home-hero__copy">
            <h1 className="home-hero__title mb-3">
              Trova la tua community di Acroyoga in tutta Italia!
            </h1>
            <p className="home-hero__subtitle mb-4">
              Scopri jam, corsi e gruppi di Acroyoga. Scopri, connettiti e partecipa.
            </p>

            {isLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Caricamento...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger my-4" role="alert">
                {error}
              </div>
            ) : (
              <div
                id="home-search-target"
                className={`home-search-shell ${
                  highlightSearch ? "home-search-shell--highlight" : ""
                }`}
              >
                <CommunityFinderSearchBar />
              </div>
            )}
          </div>
        </div>

        <div className="home-scroll-hint home-scroll-hint--mobile" aria-hidden="true">
          <span>Scorri per scoprire di più</span>
          <i className="bi bi-chevron-down"></i>
        </div>
        
      </section>

      <section className="home-features-wrap" id="home-features">
        <div className="container">

          <FeatureHighlights />

          <div className="home-scroll-hint home-scroll-hint--desktop" aria-hidden="true">
            <span>Scorri per scoprire di più</span>
            <i className="bi bi-chevron-down"></i>
          </div>

        </div>
      </section>

      <section className="home-secondary" id="home-secondary">
        <div className="container py-5">
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Caricamento...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger my-4" role="alert">
              {error}
            </div>
          ) : (
            <>
              <div className="row g-4 align-items-stretch">
                <div className="col-12 col-lg-7">
                  <CommunityStats />
                </div>

                <div className="col-12 col-lg-5">
                  <OrganizerCallout />
                </div>
              </div>

              <div className="home-search-cta">
                <button
                  type="button"
                  className="organizer-callout__search"
                  onClick={handleSearchClick}
                >
                  <i className="bi bi-search" aria-hidden="true"></i>
                  <span>Cerca la tua città</span>
                  <i className="bi bi-arrow-up" aria-hidden="true"></i>
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage

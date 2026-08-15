import CommunityFinderSearchBar from "../components/CommunityFinderSearchBar"
import CommunityStats from "../components/CommunityStats"
import FeatureHighlights from "../components/FeatureHighlights"
import OrganizerCallout from "../components/OrganizerCallout"
import SEO from "../components/SEO"
import { useCommunityFinderContext } from "../components/CommunityFinder"
import heroDesktopImage from "../assets/images/hero-acrofinder-desktop.webp"
import heroTabletImage from "../assets/images/hero-acrofinder-tablet.webp"
import heroMobileImage from "../assets/images/hero-acrofinder-mobile.webp"

function HomePage() {
  const { isLoading, error } = useCommunityFinderContext()

  return (
    <div className="home-page">
      <SEO
        title="AcroFinder - Trova community di Acroyoga in Italia"
        description="Trova community, jam e corsi di Acroyoga in tutta Italia. Cerca la tua città e scopri dove praticare vicino a te."
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
              Inizia la tua ricerca, trova la tua community.
            </h1>
            <p className="home-hero__subtitle mb-4">
              La mappa delle community di Acroyoga in tutta Italia. Scopri, connettiti e partecipa.
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
              <div className="home-search-shell">
                <CommunityFinderSearchBar />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="home-features-wrap">
        <div className="container">
          <FeatureHighlights />

          <a className="home-more-link mt-4" href="#home-secondary">
            <span>Scopri di più</span>
            <i className="bi bi-arrow-down-short" aria-hidden="true" />
          </a>
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
            <div className="row g-4 align-items-stretch">
              <div className="col-12 col-lg-7">
                <CommunityStats />
              </div>
              <div className="col-12 col-lg-5">
                <OrganizerCallout />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage

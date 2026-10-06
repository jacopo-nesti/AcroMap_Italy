import acropassportLogo from "../assets/logo/acropassport-logo.svg"
import "../styles/CollaborationBanner.css"

function CollaborationBanner() {
  return (
    <section className="pt-5" aria-labelledby="collaboration-title">
      <div className="text-center mb-4">
        <h2
          id="collaboration-title"
          className="mb-2 collaboration-banner__section-title"
        >
          Esplora oltre l&apos;Italia
        </h2>
        <p
          className="mx-auto mb-0 collaboration-banner__section-subtitle"
        >
          Progetti e piattaforme che condividono la nostra passione per l&apos;acroyoga.
        </p>
      </div>

      <article
        className="mx-auto collaboration-banner__card"
        aria-labelledby="acropassport-title"
      >
        <div className="collaboration-banner__content">
          <div className="d-flex flex-wrap align-items-start justify-content-between gap-3">
            <div className="collaboration-banner__heading-copy">
              <h3 id="acropassport-title" className="mb-0">
                <img
                  className="collaboration-banner__logo"
                  src={acropassportLogo}
                  alt="AcroPassport"
                />
              </h3>
              <p className="mb-0 collaboration-banner__partner-subtitle">
                Acroyoga nel mondo
              </p>
            </div>

            <span
              className="d-inline-flex align-items-center gap-2 collaboration-banner__badge"
            >
              <i className="bi bi-globe2" aria-hidden="true" />
              Partner internazionale
            </span>
          </div>

          <p className="mt-3 mb-3 collaboration-banner__description">
            Stai viaggiando? Scopri community, eventi e insegnanti di Acroyoga in tutto il mondo con AcroPassport.
          </p>

          <a
            className="organizer-callout__button collaboration-banner__button"
            href="https://acropassport.com/?utm_source=acrofinder&utm_medium=homepage&utm_campaign=international-partner"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Esplora AcroPassport</span>
            <i className="bi bi-arrow-right" aria-hidden="true" />
            <span className="visually-hidden">(si apre in una nuova scheda)</span>
          </a>
        </div>
      </article>
    </section>
  )
}

export default CollaborationBanner

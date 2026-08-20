import SEO from "../components/SEO"

function AboutUs() {
  return (
    <div className="about-page">

      <SEO
        title="Chi siamo | AcroFinder"
        description="Scopri AcroFinder, il progetto che raccoglie community, jam e corsi di Acroyoga in Italia."
        canonical="https://acrofinder.it/aboutus"
      />

      <div className="container about-page__container">
        <div className="row align-items-stretch g-4 g-lg-5">
          <div className="col-lg-6">
            <div className="about-page__intro">
              <span className="about-page__badge">
                Chi siamo
              </span>

              <h1 className="about-page__title">
                Connettere la community italiana di Acroyoga
              </h1>

              <p className="about-page__lead">
                AcroFinder nasce con un obiettivo semplice: rendere l&apos;Acroyoga
                accessibile a chiunque, ovunque si trovi in Italia.
              </p>

              <p className="about-page__description">
                Che tu sia un praticante esperto in cerca di una jam durante un
                viaggio, o un principiante che vuole muovere i primi passi e
                trovare un corso nella propria città, AcroFinder è il punto di
                partenza per entrare in contatto con la community locale.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <section className="about-mission">
              <h2 className="about-mission__title">
                La nostra missione
              </h2>

              <ul className="about-mission__list">
                <li className="about-mission__item">
                  <span className="about-mission__icon" aria-hidden="true">
                    <i className="bi bi-geo-alt-fill" />
                  </span>

                  <span>
                    Mappare jam, allenamenti liberi e corsi nelle diverse regioni
                    d&apos;Italia.
                  </span>
                </li>

                <li className="about-mission__item">
                  <span className="about-mission__icon" aria-hidden="true">
                    <i className="bi bi-people-fill" />
                  </span>

                  <span>
                    Mettere in contatto diretto le persone con i canali delle
                    community locali.
                  </span>
                </li>

                <li className="about-mission__item">
                  <span className="about-mission__icon" aria-hidden="true">
                    <i className="bi bi-heart-fill" />
                  </span>

                  <span>
                    Favorire connessioni, condivisione e nuove occasioni per
                    praticare Acroyoga insieme.
                  </span>
                </li>

                <li className="about-mission__item">
                  <span className="about-mission__icon" aria-hidden="true">
                    <i className="bi bi-arrow-repeat" />
                  </span>

                  <span>
                    Mantenere le informazioni accessibili e aggiornate grazie 
                    al contributo diretto della community.
                  </span>
                </li>

              </ul>
            </section>
          </div>

          <div className="col-12">
            <section className="about-support">
              <div className="about-support__icon" aria-hidden="true">
                <i className="bi bi-cup-hot-fill" />
              </div>

              <div className="about-support__content">
                <h2 className="about-support__title">
                  Ti piace AcroFinder?
                </h2>

                <p className="about-support__description">
                  Il progetto è gratuito e indipendente. Se vuoi contribuire ai
                  costi di gestione e allo sviluppo di AcroFinder, ogni supporto
                  è benvenuto.
                </p>
              </div>

              <a
                href="https://buymeacoffee.com/acrofinder"
                target="_blank"
                rel="noreferrer"
                className="about-support__button"
              >
                <i className="bi bi-cup-hot me-2" aria-hidden="true" />
                Offrici un caffè
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
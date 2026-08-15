import SEO from "../components/SEO"

function AboutUs() {
  return (
    <div className="container py-5">

      <SEO
        title="Chi siamo | AcroFinder"
        description="Scopri il progetto AcroFinder e l'obiettivo di rendere più facile trovare community di Acroyoga in Italia."
      />
      
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <span 
            className="badge mb-2 px-3 py-2 rounded-pill fw-semibold text-white"
            style={{ backgroundColor: '#15803d' }}
          >
            Chi Siamo
          </span>
          <h2 className="display-5 fw-bold text-dark mb-3">
            Connettere la community italiana di AcroYoga
          </h2>
          <p className="lead text-muted mb-4">
            AcroFinder nasce con un obiettivo semplice: rendere l'AcroYoga accessibile a chiunque, ovunque si trovi in Italia.
          </p>
          <p className="text-secondary">
            Che tu sia un praticante esperto in cerca di una jam al parco durante un viaggio, o un principiante che vuole muovere i primi passi e trovare un corso nella propria città, AcroFinder è il punto di partenza per connetterti con la community locale.
          </p>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4 bg-light rounded-4">
            <h3 className="h4 fw-bold mb-3 text-dark">La nostra Mission</h3>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-3" style={{ color: '#1e293b' }}>
              <li className="d-flex align-items-start gap-3">
                <i className="bi bi-geo-alt-fill fs-5" style={{ color: '#15803d' }}></i>
                <span>Mappare jam, allenamenti liberi e corsi in tutte le regioni d'Italia.</span>
              </li>
              <li className="d-flex align-items-start gap-3">
                <i className="bi bi-people-fill fs-5" style={{ color: '#15803d' }}></i>
                <span>Mettere in contatto diretto le persone con i canali social ufficiali dei gruppi.</span>
              </li>
              <li className="d-flex align-items-start gap-3">
                <i className="bi bi-heart-fill fs-5" style={{ color: '#15803d' }}></i>
                <span>Promuovere la condivisione, la fiducia e il divertimento all'aria aperta.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12">
          <div className="card border-0 shadow-sm p-4 text-center bg-light mt-2 rounded-4">
            <h3 className="h4 fw-bold mb-2 text-dark">Ti piace AcroFinder?</h3>
            <p className="text-muted small mb-3 mx-auto" style={{ maxWidth: '650px' }}>
              Il progetto è gratuito e gestito nel tempo libero. Se vuoi sostenere i costi del dominio o semplicemente offrirci un caffè per il lavoro svolto, ogni piccolo contributo è super apprezzato!
            </p>
            <div>
              <a 
                href="https://buymeacoffee.com/acrofinder" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-warning fw-semibold px-4 rounded-pill shadow-sm"
              >
                <i className="bi bi-cup-hot-fill me-2"></i>
                Offrici un caffè
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AboutUs

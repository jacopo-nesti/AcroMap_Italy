import { Link } from 'react-router'

const STEPS = [
  {
    num: '01',
    title: 'Cerca',
    desc: 'Cerca una città per trovare le community di Acroyoga presenti.'
  },
  {
    num: '02',
    title: 'Esplora',
    desc: 'Scopri community, jam e corsi disponibili nella tua zona.'
  },
  {
    num: '03',
    title: 'Contribuisci',
    desc: 'Segnala una community, una jam o un corso per aiutare a mantenere AcroFinder aggiornato.',
    cta: true
  }
]

function HowItWorkSection() {
  return (
    <section className="container text-center my-4">
      <h2 className="h4 fw-bold text-dark mb-4">Come funziona</h2>
      
      <div className="row g-4 text-start justify-content-center">
        {STEPS.map(({ num, title, desc, cta }) => (
          <div key={num} className="col-md-4">
            <h3 className="h5 fw-bold text-dark mb-3">
              <span className="text-success">{num}</span> — {title}
            </h3>
            
            <p className="text-muted small lh-base mb-3">
              {desc}
            </p>

            {cta && (
              <Link to="/contribute" className="btn btn-outline-success btn-sm rounded-pill fw-semibold px-3">
                Contribuisci al progetto &rarr;
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorkSection

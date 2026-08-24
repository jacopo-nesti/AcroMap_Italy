import { Link } from 'react-router'
import logoImage from '../assets/logo/acrofinder-logo.png'

const footerGroups = [
  {
    label: 'Esplora',
    className: 'col-6 col-md-6 col-lg-2',
    links: [
      { label: 'Community', to: '/community' },
      { label: 'Mappa', to: '/map' },
      { label: 'Guida', to: '/guide' },
    ],
  },
  {
    label: 'Partecipa',
    className: 'col-6 col-md-6 col-lg-3',
    links: [
      { label: 'Contribuisci', to: '/contribute' },
      { label: 'Chi siamo', to: '/aboutus' },
      { label: 'Contatti', to: '/contactus' },
    ],
  },
  {
    label: 'Legale',
    className: 'col-6 col-md-6 col-lg-2',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Termini di utilizzo', to: '/terms' },
    ],
  },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container px-4">
        <div className="row g-4 g-lg-5 site-footer__grid">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="site-footer__brand">
              <img
                src={logoImage}
                alt=""
                className="site-footer__logo"
                aria-hidden="true"
              />
              <span className="site-footer__brand-name">AcroFinder</span>
            </div>
            <p className="site-footer__description">
              Progetto indipendente dedicato alla community italiana di Acroyoga.
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav
              key={group.label}
              className={group.className}
              aria-label={`${group.label} nel footer`}
            >
              <h2 className="site-footer__heading">{group.label}</h2>
              <ul className="list-unstyled mb-0 site-footer__links">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="site-footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="site-footer__bottom">
          <p className="mb-0">
            &copy; {currentYear} AcroFinder. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

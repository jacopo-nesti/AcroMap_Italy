function SocialLinks({ community }) {
  if (!community) return null

  const { whatsapp, instagram, facebook, website } = community

  const hasSocials = whatsapp || instagram || facebook || website
  if (!hasSocials) return null

  return (
    <div className="socials d-flex flex-wrap gap-2">
      {whatsapp && (
        <a 
          href={whatsapp} 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-success btn-sm rounded-pill fw-semibold shadow-sm px-3"
        >
          <i className="bi bi-whatsapp me-1"></i> WhatsApp
        </a>
      )}

      {instagram && (
        <a 
          href={instagram} 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-outline-danger btn-sm rounded-pill fw-semibold shadow-sm px-3"
        >
          <i className="bi bi-instagram me-1"></i> Instagram
        </a>
      )}

      {facebook && (
        <a 
          href={facebook} 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-outline-primary btn-sm rounded-pill fw-semibold shadow-sm px-3"
        >
          <i className="bi bi-facebook me-1"></i> Facebook
        </a>
      )}

      {website && (
        <a 
          href={website} 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-outline-secondary btn-sm rounded-pill fw-semibold shadow-sm px-3"
        >
          <i className="bi bi-globe me-1"></i> Sito Web
        </a>
      )}
    </div>
  )
}

export default SocialLinks
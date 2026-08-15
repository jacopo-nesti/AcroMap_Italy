function SocialLinks({ community }) {
  if (!community) return null

  const { whatsapp, instagram, facebook, website } = community

  const hasSocials = whatsapp || instagram || facebook || website
  if (!hasSocials) return null

  const socialLinks = [
    { url: whatsapp, label: "WhatsApp", icon: "bi-whatsapp" },
    { url: instagram, label: "Instagram", icon: "bi-instagram" },
    { url: facebook, label: "Facebook", icon: "bi-facebook" },
    { url: website, label: "sito web", icon: "bi-globe" },
  ].filter((social) => social.url)

  return (
    <nav className="city-social-links" aria-label={`Canali social di ${community.name}`}>
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Apri ${social.label} di ${community.name} in una nuova scheda`}
        >
          <i className={`bi ${social.icon}`} aria-hidden="true"></i>
        </a>
      ))}
    </nav>
  )
}

export default SocialLinks

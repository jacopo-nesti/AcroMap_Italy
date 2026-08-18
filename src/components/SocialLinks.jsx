function SocialLinks({ community }) {
  if (!community) return null

  const { whatsapp, instagram, facebook, website } = community

  const hasSocials = whatsapp || instagram || facebook || website
  if (!hasSocials) return null

  const socialLinks = [
    {
      url: whatsapp,
      label: "WhatsApp",
      icon: "bi-whatsapp",
      className: "city-social-links__whatsapp",
    },
    {
      url: instagram,
      label: "Instagram",
      icon: "bi-instagram",
      className: "city-social-links__instagram",
    },
    {
      url: facebook,
      label: "Facebook",
      icon: "bi-facebook",
      className: "city-social-links__facebook",
    },
    {
      url: website,
      label: "Sito web",
      icon: "bi-globe",
      className: "city-social-links__website",
    },
  ].filter((social) => social.url)

  return (
    <nav className="city-social-links" aria-label={`Canali social di ${community.name}`}>
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="{social.className}"
          aria-label={`Apri ${social.label} di ${community.name} in una nuova scheda`}
        >
          <i className={`bi ${social.icon}`} aria-hidden="true"></i>
        </a>
      ))}
    </nav>
  )
}

export default SocialLinks

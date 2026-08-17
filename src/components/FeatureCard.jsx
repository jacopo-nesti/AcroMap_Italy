function FeatureCard({ icon, title, description, variant }) {
  return (
    <article className="home-feature-card h-100">
      <div className={`home-feature-card__icon home-feature-card__icon--${variant}`}>
        <i className={icon} aria-hidden="true" />
      </div>
      <h2 className="h5 fw-semibold mb-2">{title}</h2>
      <p className="mb-0">{description}</p>
    </article>
  )
}

export default FeatureCard
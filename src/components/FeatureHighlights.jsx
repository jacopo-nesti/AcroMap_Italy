import FeatureCard from "./FeatureCard"

const featureItems = [
  {
    icon: "bi bi-flower1",
    title: "Per tutti i livelli",
    description: "Dai principianti agli avanzati, c'è spazio per tutti.",
    variant: "success",
  },
  {
    icon: "bi bi-people-fill",
    title: "Community autentiche",
    description: "Gruppi locali, insegnanti qualificati e persone appassionate.",
    variant: "warning",
  },
  {
    icon: "bi bi-geo-alt-fill",
    title: "In tutta Italia",
    description: "Dalle grandi città ai piccoli centri, tutta la mappa.",
    variant: "primary",
  },
  {
    icon: "bi bi-heart-fill",
    title: "Passione che unisce",
    description: "Acroyoga è movimento, connessione e fiducia reciproca.",
    variant: "danger",
  },
]

function FeatureHighlights() {
  return (
    <div className="home-features row g-3 g-lg-4">
      {featureItems.map((item) => (
        <div className="col-12 col-md-6 col-lg-3" key={item.title}>
          <FeatureCard {...item} />
        </div>
      ))}
    </div>
  )
}

export default FeatureHighlights

import FeatureCards from "./FeatureCards"
import IntroSection from "./IntroSection"

function HomeHero() {

  return (
    <section className="bg-light py-5 px-3 text-center rounded-3 shadow-sm my-4">

      <IntroSection />

      <FeatureCards />

    </section>
  )
}

export default HomeHero
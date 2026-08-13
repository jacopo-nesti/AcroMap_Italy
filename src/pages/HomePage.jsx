import HomeHero from "../components/HomeHero"
import CommunityFinderSearchBar from "../components/CommunityFinderSearchBar"
import CommunityStats from "../components/CommunityStats"
import OrganizerCallout from "../components/OrganizerCallout"
import SEO from "../components/SEO"
import { useCommunityFinderContext } from "../components/CommunityFinder"

function HomePage() {
  const { isLoading, error } = useCommunityFinderContext()

  return (
    <div className="container my-5">

      <SEO
        title="AcroFinder - Trova community di Acroyoga in Italia"
        description="Trova community, jam e corsi di Acroyoga in tutta Italia. Cerca la tua città e scopri dove praticare vicino a te."
      />

      <HomeHero />

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger my-4" role="alert">
          {error}
        </div>
      ) : (
        <>
          <div className="row justify-content-center my-4">
            <CommunityFinderSearchBar />
          </div>

          <div className="my-5">
            <CommunityStats />
          </div>
        </>
      )}

      <hr className="my-5 text-border opacity-25" />

      <OrganizerCallout />
    </div>
  )
}

export default HomePage

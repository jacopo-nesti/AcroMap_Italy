import HomeHero from "../components/HomeHero"
import CommunityFinderSearchBar from "../components/CommunityFinderSearchBar"
import CommunityStats from "../components/CommunityStats"
import OrganizerCallout from "../components/OrganizerCallout"

function HomePage() {
  return (
    <main className="container my-5">
      <HomeHero />

      <div className="row justify-content-center my-4">
        <CommunityFinderSearchBar />
      </div>

      <div className="my-5">
        <CommunityStats />
      </div>

      <hr className="my-5 text-border opacity-25" />

      <OrganizerCallout />
    </main>
  )
}

export default HomePage
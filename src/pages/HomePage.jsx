import HomeHero from "../components/HomeHero"
import { CommunityFinder } from "../components/CommunityFinder"
import CommunityFinderSearchBar from "../components/CommunityFinderSearchBar"
import FeatureCards from "../components/FeatureCards"
import CommunityStats from "../components/CommunityStats"
import CommunityFinderMap from "../components/CommunityFinderMap"
import Contribute from "./Contribute"

function HomePage() {
  return (
    <main className="container my-5">
      <CommunityFinder>
        <HomeHero />

        <div className="row justify-content-center my-4">
          <CommunityFinderSearchBar />
        </div>

        <div className="row g-4 justify-content-center">
          <FeatureCards />
          <CommunityStats />
          <CommunityFinderMap />
        </div>
      </CommunityFinder>

      <div>
        <Contribute />
      </div>
    </main>
  )
}

export default HomePage
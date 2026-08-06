import MapItaly from "../components/MapItaly"
import { useCommunityFinderContext } from "./CommunityFinder"

function CommunityFinderMap() {
  const { filteredCities, selectedCity } = useCommunityFinderContext()

  return (
    <div className="col-12 col-lg-10 mx-auto">
      <div id="mappa" className="rounded-3 overflow-hidden shadow-sm border">
        <MapItaly cities={filteredCities} selectedCity={selectedCity} />
      </div>
    </div>
  )
}

export default CommunityFinderMap
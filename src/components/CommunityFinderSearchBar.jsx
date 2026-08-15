import SearchBar from "../components/SearchBar"
import SearchResults from "./SearchResults"
import { useCommunityFinderContext } from "./CommunityFinder"

function CommunityFinderSearchBar() {
  const { search, setSearch, filteredCities, setSelectedCity } =
    useCommunityFinderContext()

  return (
    <div className="home-search">
      <div className="input-group home-search__group">
        <SearchBar search={search} setSearch={setSearch} />
        {search && (
          <button
            className="btn home-search__clear"
            type="button"
            onClick={() => setSearch("")}
            aria-label="Cancella la ricerca"
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
      </div>

      <div
        id="community-search-results"
        className="home-search__results"
        aria-live="polite"
      >
        <SearchResults
          search={search}
          filteredCities={filteredCities}
          setSelectedCity={setSelectedCity}
        />
      </div>
    </div>
  )
}

export default CommunityFinderSearchBar

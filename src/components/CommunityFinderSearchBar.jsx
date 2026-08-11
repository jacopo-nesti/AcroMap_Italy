import SearchBar from "../components/SearchBar"
import SearchResults from "./SearchResults"
import { useCommunityFinderContext } from "./CommunityFinder"

function CommunityFinderSearchBar() {
  const { search, setSearch, filteredCities, setSelectedCity } =
    useCommunityFinderContext()

  return (
    <div className="col-12 col-md-8 col-lg-6">
      <div className="p-3 bg-white border border-2 border-success rounded-3 text-center">
        <h5 className="fw-bold mb-3">Cerca una città</h5>

        <div className="input-group mb-3">
          <SearchBar search={search} setSearch={setSearch} />
          {search && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>

        <div
          className="search-results-wrapper"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <SearchResults
            search={search}
            filteredCities={filteredCities}
            setSelectedCity={setSelectedCity}
          />
        </div>
      </div>
    </div>
  )
}

export default CommunityFinderSearchBar
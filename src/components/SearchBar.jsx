function SearchBar({ search, setSearch}) {

    return (

        <>
            <label htmlFor="community-search" className="visually-hidden">
                Cerca una città
            </label>
            <input
                id="community-search"
                type="search"
                className="form-control home-search__input"
                placeholder="Es. Firenze, Milano, Bologna..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-controls="community-search-results"
            />
        </>

    )
}

export default SearchBar

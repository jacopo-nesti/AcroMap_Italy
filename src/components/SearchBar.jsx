function SearchBar({ search, setSearch}) {

    return (

        <input
            type="text"
            className="form-control"
            placeholder="Es. Firenze, Milano, Bologna..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />

    )
}

export default SearchBar
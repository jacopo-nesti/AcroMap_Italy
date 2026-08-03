function SearchBar({ search, setSearch}) {

    return (

        <input
            type="text"
            className="form-control"
            placeholder="Cerca una città..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />

    )
}

export default SearchBar
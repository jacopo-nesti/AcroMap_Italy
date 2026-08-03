import { Link } from "react-router"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link to="/" className="navbar-brand">AcroMap Italy</Link>

            <ul className="navbar-nav ms-auto d-flex flex-row gap-3 list-unstyled mb-0">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contribute" className="nav-link">Contribuisci</Link>
                </li>
                <li className="nav-item">
                    <Link to="/aboutus" className="nav-link">Chi siamo</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
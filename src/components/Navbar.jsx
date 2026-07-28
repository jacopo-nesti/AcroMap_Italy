import { Link } from "react-router"

function Navbar() {
    return (
        <nav>
            <Link to="/">AcroMap Italy</Link>

            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/contribute">Contribuisci</Link>
                </li>
                <li>
                    <Link to="/aboutus">Chi siamo</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
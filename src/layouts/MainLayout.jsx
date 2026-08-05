import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router"
import ScrollToTop from "../components/ScrollToTop"

function MainLayout() {

    return (
        <>
            <ScrollToTop />
                <div className="d-flex flex-column min-vh-100">
                    <Navbar />

                    <main className="flex-grow-1">
                        <Outlet />
                    </main>

                    <Footer />
                </div>
        </>
    )
}

export default MainLayout
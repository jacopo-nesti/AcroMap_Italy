import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet, useLocation } from "react-router"
import ScrollToTop from "../components/ScrollToTop"

function MainLayout() {
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  return (
    <>
      <ScrollToTop />
      <div className="d-flex flex-column min-vh-100">
        <Navbar isHomePage={isHomePage} />

        <main className="flex-grow-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default MainLayout

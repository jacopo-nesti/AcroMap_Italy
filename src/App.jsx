import { Route, Routes } from "react-router"
import Contribute from "./pages/Contribute"
import AboutUs from "./pages/AboutUs"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFoundPage"
import MainLayout from "./layouts/MainLayout"
import CitiesPage from "./pages/CitiesPage"
import CityPage from "./pages/CityPage"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import Donations from "./pages/Donations"

function App() {

  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<HomePage />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/city/:slug" element={<CityPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/donations" element={<Donations />} />

      </Route>

    </Routes>
  )
}

export default App
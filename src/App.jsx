import { Route, Routes } from "react-router"
import { CommunityFinder } from "./components/CommunityFinder" // Assicurati che il percorso sia corretto
import Contribute from "./pages/Contribute"
import AboutUs from "./pages/AboutUs"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFoundPage"
import MainLayout from "./layouts/MainLayout"
import CitiesPage from "./pages/CitiesPage"
import CityPage from "./pages/CityPage"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import ContactPage from "./pages/ContactPage"
import MapPage from "./pages/MapPage"
import RegionJamsPage from "./pages/RegionJamsPage"
import GuidePage from "./pages/GuidePage"

function App() {
  return (
    <CommunityFinder>

      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<HomePage />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/community" element={<CitiesPage />} />
          <Route path="/city/:slug" element={<CityPage />} />
          <Route path="/region/:regionSlug/jams" element={<RegionJamsPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contactus" element={<ContactPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="*" element={<NotFound />} />

        </Route>

      </Routes>
      
    </CommunityFinder>
  )
}

export default App

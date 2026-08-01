import Contribute from "./pages/Contribute"
import AboutUs from "./pages/AboutUs"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFoundPage"
import MainLayout from "./layouts/MainLayout"
import CitiesPage from "./pages/CitiesPage"
import CityPage from "./pages/CityPage"
import { Route, Routes } from "react-router"

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

      </Route>

    </Routes>
  )
}

export default App
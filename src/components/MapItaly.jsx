import { MapContainer, TileLayer } from "react-leaflet"
import CityMarker from "./CityMarker"
import ChangeView from "./ChangeView"

// Limiti geografici dell'Italia [Sud-Ovest, Nord-Est]
const ITALY_BOUNDS = [
  [35.0, 6.0],
  [47.5, 18.5]
]

function MapItaly({ cities, selectedCity }) {
  return (
    <MapContainer
      center={[42.8, 12.5]}
      zoom={6}
      minZoom={5}
      maxZoom={18}
      maxBounds={ITALY_BOUNDS}
      maxBoundsViscosity={1.0}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ChangeView city={selectedCity} />

      {cities.map((city) => (
        <CityMarker
          key={city.id}
          city={city}
        />
      ))}
    </MapContainer>
  )
}

export default MapItaly
import { MapContainer, TileLayer } from "react-leaflet"
import CityMarker from "./CityMarker"
import ChangeView from "./ChangeView"

// Limiti di navigazione con margine per l'auto-pan dei popup [Sud-Ovest, Nord-Est]
const ITALY_BOUNDS = [
  [30.0, 3.0],
  [53.0, 21.5]
]

function MapItaly({ cities = [], selectedCity = null }) {
  return (
    <MapContainer
      center={[42.8, 12.5]}
      zoom={6}
      minZoom={5}
      maxZoom={18}
      maxBounds={ITALY_BOUNDS}
      maxBoundsViscosity={1.0}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedCity && <ChangeView city={selectedCity} />}

      {cities.map((city) => (
        <CityMarker
          key={city.id || city.name}
          city={city}
        />
      ))}
    </MapContainer>
  )
}

export default MapItaly

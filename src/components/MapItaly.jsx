import { MapContainer, TileLayer } from "react-leaflet"
import CityMarker from "./CityMarker"
import ChangeView from "./ChangeView"

function MapItaly({ cities, selectedCity }) {

    return (
        <MapContainer
            center={[42.8, 12.5]}
            zoom={6}
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
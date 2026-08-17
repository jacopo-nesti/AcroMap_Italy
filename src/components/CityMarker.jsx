import { Marker, Popup } from "react-leaflet"
import { Link } from "react-router"
import L from "leaflet"

import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

const defaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

function CityMarker({ city }) {

    return (
        <Marker
            position={[city.coordinates.lat, city.coordinates.lng]}
            icon={defaultIcon}
        >
            <Popup>
                <h3>{city.name}</h3>

                <p>{city.region}</p>

                <Link to={`/city/${city.slug}`}>
                    Vai alla community
                </Link>
            </Popup>
        </Marker>
    )
}

export default CityMarker
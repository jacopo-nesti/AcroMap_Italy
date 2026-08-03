import { Marker, Popup } from "react-leaflet"
import { Link } from "react-router"

function CityMarker({ city }) {

    return (
        <Marker position={[city.coordinates.lat, city.coordinates.lng]}>

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
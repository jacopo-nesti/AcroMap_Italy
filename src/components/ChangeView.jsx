import { useEffect } from "react"
import { useMap } from "react-leaflet"

function ChangeView({ city }) {

    const map = useMap()

    useEffect(() => {
        if (city && city.coordinates) {
            map.flyTo([city.coordinates.lat, city.coordinates.lng], 11)
        } else {
            map.flyTo([42.8, 12.5], 6)
        }

    }, [city, map])

    return null

}

export default ChangeView
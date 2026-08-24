import { useEffect } from "react"
import { useLocation } from "react-router"

function ScrollToTop() {

    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (hash === "#home-search-target") return

        window.scrollTo(0, 0)
    }, [pathname, hash])

    return null
}

export default ScrollToTop

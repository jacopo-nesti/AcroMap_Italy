import { useEffect } from "react"

function SEO({
  title,
  description,
  canonical,
  robots = "index, follow",
}) {
  useEffect(() => {
    if (title) {
      document.title = title

      const ogTitle = document.querySelector(
        'meta[property="og:title"]'
      )

      if (ogTitle) {
        ogTitle.setAttribute("content", title)
      }
    }

    if (description) {
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      )

      if (metaDescription) {
        metaDescription.setAttribute("content", description)
      }

      const ogDescription = document.querySelector(
        'meta[property="og:description"]'
      )

      if (ogDescription) {
        ogDescription.setAttribute("content", description)
      }
    }

    if (canonical) {
      let canonicalLink = document.querySelector(
        'link[rel="canonical"]'
      )

      if (!canonicalLink) {
        canonicalLink = document.createElement("link")
        canonicalLink.rel = "canonical"
        document.head.appendChild(canonicalLink)
      }

      canonicalLink.setAttribute("href", canonical)

      const ogUrl = document.querySelector(
        'meta[property="og:url"]'
      )

      if (ogUrl) {
        ogUrl.setAttribute("content", canonical)
      }
    }

    let metaRobots = document.querySelector(
      'meta[name="robots"]'
    )

    if (!metaRobots) {
      metaRobots = document.createElement("meta")
      metaRobots.setAttribute("name", "robots")
      document.head.appendChild(metaRobots)
    }

    metaRobots.setAttribute("content", robots)
  }, [title, description, canonical, robots])

  return null
}

export default SEO
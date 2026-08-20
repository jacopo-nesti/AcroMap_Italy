import { Link, useParams } from "react-router"
import { useMemo } from "react"
import SEO from "../components/SEO"
import BackButton from "../components/BackButton"
import { useCommunityFinderContext } from "../components/CommunityFinder"
import { sortByDayAndTime } from "../utils/SortingHelper"

function createRegionSlug(regionName) {
  return regionName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
}

function RegionJamsPage() {
  const { regionSlug } = useParams()
  const { cities, isLoading, error } = useCommunityFinderContext()

  const regionCities = useMemo(() => {
    return cities.filter(
      (city) => createRegionSlug(city.region) === regionSlug
    )
  }, [cities, regionSlug])

  const regionName = regionCities[0]?.region

  const jams = useMemo(() => {
    const items = regionCities.flatMap((city) =>
      (city.communities || []).flatMap((community) =>
        (community.jams || []).map((jam) => ({
          ...jam,
          city,
          community,
        }))
      )
    )

    return sortByDayAndTime(items)
  }, [regionCities])

  if (isLoading) {
    return (
      <p className="text-center mt-5 text-muted">
        Caricamento...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-center mt-5 text-danger">
        {error}
      </p>
    )
  }

  if (!regionName) {
    return (
      <p className="text-center mt-5 text-muted">
        Regione non trovata.
      </p>
    )
  }

  return (
    <div className="region-jams-page">

      <SEO
        title={`Jam di Acroyoga in ${regionName} | AcroFinder`}
        description={`Scopri tutte le jam di Acroyoga disponibili in ${regionName}, con città, orari, luoghi e community.`}
      />

      <div className="container py-4">

        <BackButton />

        <header className="region-jams-page__header">
          <span className="region-jams-page__eyebrow">
            <i className="bi bi-people-fill" aria-hidden="true"></i>
            Jam regionali
          </span>

          <h1>Jam di Acroyoga in {regionName}</h1>

          <p>
            Scopri dove praticare Acroyoga nelle diverse città della regione.
          </p>
        </header>

        {jams.length === 0 ? (
          <p className="region-jams-page__empty">
            Nessuna jam disponibile al momento.
          </p>
        ) : (
          <div className="region-jams-grid">
            {jams.map((jam, index) => (
              <article
                key={`${jam.city.slug}-${jam.community.id}-${jam.id || index}`}
                className="region-jam-card"
              >
                <div className="region-jam-card__top">

                  <span className="region-jam-card__city">
                    <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                    {jam.city.name}
                  </span>

                  {jam.season && (
                    <span className="region-jam-card__season">
                      {jam.season === "summer" && "Estiva"}
                      {jam.season === "winter" && "Invernale"}
                      {jam.season === "all-year" && "Tutto l'anno"}
                    </span>
                  )}

                </div>

                <h2>{jam.community.name}</h2>

                <p className="region-jam-card__day">
                  <i className="bi bi-calendar-event" aria-hidden="true"></i>
                  {jam.day}
                </p>

                {(jam.start_time || jam.end_time) && (
                  <p>
                    <i className="bi bi-clock" aria-hidden="true"></i>
                    {jam.start_time}
                    {jam.end_time ? ` – ${jam.end_time}` : ""}
                  </p>
                )}

                {jam.location && (
                  <p>
                    <i className="bi bi-geo-alt" aria-hidden="true"></i>
                    {jam.location}
                  </p>
                )}

                {jam.season_notes && (
                  <p className="region-jam-card__season-notes">
                    {jam.season_notes}
                  </p>
                )}

                <div className="region-jam-card__actions">

                  {jam.maps_url && (
                    <a
                      href={jam.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                      Apri su Maps
                    </a>
                  )}

                    <Link
                      to={`/city/${jam.city.slug}?community=${jam.community.id}`}
                    >
                      Vai alla community
                      <i className="bi bi-arrow-right" aria-hidden="true"></i>
                    </Link>

                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RegionJamsPage
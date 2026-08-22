import { Link, useParams } from "react-router"
import { useMemo } from "react"
import SEO from "../components/SEO"
import BackButton from "../components/BackButton"
import { useCommunityFinderContext } from "../components/CommunityFinder"
import { groupSharedJams } from "../utils/jamHelpers"
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

    return sortByDayAndTime(groupSharedJams(items))
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
        description={`Scopri tutte le jam di Acroyoga disponibili in ${regionName}, con città, dettagli e community di riferimento.`}
        canonical={`https://acrofinder.it/region/${regionSlug}/jams`}
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
            {jams.map((jam, index) => {
              const isVariable = jam.type === "variable"
              const isShared = jam.shared_id != null

              return (
                <article
                  key={`${jam.city.slug}-${jam.community.id}-${jam.id || index}`}
                  className={`region-jam-card${isVariable ? " region-jam-card--variable" : ""}`}
                >
                <div className="region-jam-card__top">

                  <span className="region-jam-card__city">
                    <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                    {jam.city.name}
                  </span>

                  <div className="region-jam-card__badges">
                    {isShared && (
                      <span className="region-jam-card__shared-badge">
                        Jam condivisa
                      </span>
                    )}

                    {isVariable && (
                      <span className="region-jam-card__variable-badge">
                        Jam variabile
                      </span>
                    )}

                    {jam.season && (
                      <span className="region-jam-card__season">
                        {jam.season === "summer" && "Estiva"}
                        {jam.season === "winter" && "Invernale"}
                        {jam.season === "all-year" && "Tutto l'anno"}
                      </span>
                    )}
                  </div>

                </div>

                <h2>
                  {isShared ? "Jam condivisa tra community" : jam.community.name}
                </h2>

                {isShared && (
                  <p className="region-jam-card__communities">
                    <i className="bi bi-people-fill" aria-hidden="true"></i>
                    <span>
                      <strong>Community partecipanti:</strong>{" "}
                      {jam.participatingCommunities
                        .map((community) => community.name)
                        .join(", ")}
                    </span>
                  </p>
                )}

                {isVariable ? (
                  <p className="region-jam-card__variable-copy">
                    Giorno, orario e luogo vengono definiti di volta in volta dalla community.
                  </p>
                ) : jam.day && (
                  <p className="region-jam-card__day">
                    <i className="bi bi-calendar-event" aria-hidden="true"></i>
                    {jam.day}
                  </p>
                )}

                {!isVariable && (jam.start_time || jam.end_time) && (
                  <p>
                    <i className="bi bi-clock" aria-hidden="true"></i>
                    {jam.start_time}
                    {jam.end_time ? ` – ${jam.end_time}` : ""}
                  </p>
                )}

                {!isVariable && jam.location && (
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

                {isVariable && jam.updates_method && (
                  <p>
                    <i className="bi bi-megaphone-fill" aria-hidden="true"></i>
                    {jam.updates_method}
                  </p>
                )}

                {isVariable && jam.notes && (
                  <p className="region-jam-card__notes">{jam.notes}</p>
                )}

                <div className="region-jam-card__actions">

                  {!isVariable && jam.maps_url && (
                    <a
                      href={jam.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                      Apri su Maps
                    </a>
                  )}

                  {isVariable && jam.updates_url && (
                    <a
                      href={jam.updates_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-bell-fill" aria-hidden="true"></i>
                      Ricevi gli aggiornamenti
                    </a>
                  )}

                    <Link
                      to={isShared
                        ? `/city/${jam.city.slug}`
                        : `/city/${jam.city.slug}?community=${jam.community.id}`}
                    >
                      {isShared
                        ? `Vai alle community di ${jam.city.name}`
                        : "Vai alla community"}
                      <i className="bi bi-arrow-right" aria-hidden="true"></i>
                    </Link>

                </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default RegionJamsPage

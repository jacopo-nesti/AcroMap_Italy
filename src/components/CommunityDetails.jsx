import { forwardRef } from "react"
import SocialLinks from "./SocialLinks"
import JamCard from "./JamCard"
import CourseCard from "./CourseCard"
import HorizontalScroller from "./HorizontalScroller"
import { sortByDayAndTime } from "../utils/SortingHelper"

const CommunityDetails = forwardRef(function CommunityDetails(
  { community, panelId },
  ref
) {
  const jams = sortByDayAndTime(community.jams || [])
  const courses = sortByDayAndTime(community.courses || [])

  return (
    <article
      ref={ref}
      id={panelId}
      className="city-community-detail"
      aria-labelledby={`${panelId}-title`}
    >
      <header className="city-community-detail__header">
        <span className="city-community-detail__icon" aria-hidden="true">
          <i className="bi bi-people-fill"></i>
        </span>

        <div className="city-community-detail__copy">
          <h3 id={`${panelId}-title`}>{community.name}</h3>

          {community.description && (
            <p>{community.description}</p>
          )}

          <SocialLinks community={community} />
        </div>
      </header>

      <HorizontalScroller
        title="Jam & Pratiche"
        icon="people-fill"
        variant="jams"
        resetKey={community.id}
        emptyText="Nessuna jam al momento."
      >
        {jams.map((jam, index) => (
          <JamCard key={jam.id || index} jam={jam} />
        ))}
      </HorizontalScroller>

      <HorizontalScroller
        title="Corsi"
        icon="mortarboard"
        variant="courses"
        resetKey={community.id}
        emptyText="Nessun corso disponibile."
      >
        {courses.map((course, index) => (
          <CourseCard key={course.id || index} course={course} />
        ))}
      </HorizontalScroller>

      <div className="city-community-detail__notice">
        <i className="bi bi-info-circle-fill" aria-hidden="true"></i>

        <p>
          <strong>Prima di partecipare:</strong> giorni, orari e luoghi
          possono variare. Verifica sempre l'attività contattando
          direttamente la community tramite i suoi canali ufficiali.
        </p>
      </div>
    </article>
  )
})

export default CommunityDetails

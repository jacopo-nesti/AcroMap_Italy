import { forwardRef, useEffect, useState } from "react"
import SocialLinks from "./SocialLinks"
import JamCard from "./JamCard"
import CourseCard from "./CourseCard"
import DayFilter from "./DayFilter"
import HorizontalScroller from "./HorizontalScroller"
import { sortByDayAndTime } from "../utils/SortingHelper"

const CommunityDetails = forwardRef(function CommunityDetails({ community, panelId }, ref) {
  const [selectedDay, setSelectedDay] = useState("Tutti")

  useEffect(() => {
    setSelectedDay("Tutti")
  }, [community.id])

  const filterByDay = (items) => {
    if (selectedDay === "Tutti") return items

    return items.filter((item) => item.day?.toLowerCase().startsWith(selectedDay.toLowerCase().slice(0, 3)))
  }

  const jams = filterByDay(sortByDayAndTime(community.jams || []))
  const courses = filterByDay(sortByDayAndTime(community.courses || []))

  return (
    <article ref={ref} id={panelId} className="city-community-detail" aria-labelledby={`${panelId}-title`}>
      <header className="city-community-detail__header">
        <span className="city-community-detail__icon" aria-hidden="true">
          <i className="bi bi-people-fill"></i>
        </span>
        <div className="city-community-detail__copy">
          <h3 id={`${panelId}-title`}>{community.name}</h3>
          {community.description && <p>{community.description}</p>}
          <SocialLinks community={community} />
        </div>
      </header>

      <div className="city-community-detail__notice" role="note">
        <i className="bi bi-info-circle-fill" aria-hidden="true"></i>

        <p>
          <strong>Prima di partecipare:</strong> giorni, orari e luoghi possono variare.
          Verifica sempre l'attività contattando direttamente la community tramite
          i suoi canali ufficiali.
        </p>
      </div>

      <div className="city-community-detail__filter">
        <DayFilter selectedDay={selectedDay} onSelectDay={setSelectedDay} />
      </div>

      <HorizontalScroller
        title="Jam & Pratiche"
        icon="people-fill"
        variant="jams"
        resetKey={community.id}
        emptyText={selectedDay === "Tutti" ? "Nessuna jam al momento." : `Nessuna jam il ${selectedDay}.`}
      >
        {jams.map((jam, index) => <JamCard key={jam.id || index} jam={jam} />)}
      </HorizontalScroller>

      <HorizontalScroller
        title="Corsi & Classi "
        icon="mortarboard"
        variant="courses"
        resetKey={community.id}
        emptyText={selectedDay === "Tutti" ? "Nessun corso disponibile." : `Nessun corso il ${selectedDay}.`}
      >
        {courses.map((course, index) => <CourseCard key={course.id || index} course={course} />)}
      </HorizontalScroller>
    </article>
  )
})

export default CommunityDetails
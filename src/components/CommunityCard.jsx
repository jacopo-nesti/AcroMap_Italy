import { useState } from 'react'
import SocialLinks from './SocialLinks'
import JamCard from './JamCard'
import CourseCard from './CourseCard'
import DetailSection from './DetailSection'
import DayFilter from './DayFilter'
import { sortByDayAndTime } from '../utils/SortingHelper'

function CommunityCard({ community, isOpen, onToggle }) {
  const [showJams, setShowJams] = useState(false)
  const [showCourses, setShowCourses] = useState(false)
  const [selectedDay, setSelectedDay] = useState('Tutti')

  const sortedJams = sortByDayAndTime(community.jams || [])
  const sortedCourses = sortByDayAndTime(community.courses || [])

  const filterByDay = (items) => {
    if (selectedDay === 'Tutti') return items
    return items.filter((item) => item.day?.toLowerCase().startsWith(selectedDay.toLowerCase().slice(0, 3)))
  }

  const filteredJams = filterByDay(sortedJams)
  const filteredCourses = filterByDay(sortedCourses)

  return (
    <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden community-card-hover">

      <div onClick={onToggle} className="card-body p-4 border-0" style={{ cursor: 'pointer' }} role="button" aria-expanded={isOpen}>
        <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
          <h3 className="h4 fw-bold mb-0 text-dark" style={{ letterSpacing: '-0.02em', color: '#0f291e' }}>
            {community.name}
          </h3>
          <span className="badge rounded-circle p-2 bg-white text-dark border shadow-sm d-flex align-items-center justify-content-center">
            <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
          </span>
        </div>

        {community.description && <p className="text-secondary fs-6 mb-3 mt-2">{community.description}</p>}

        <div onClick={(e) => e.stopPropagation()} className="mt-2">
          <SocialLinks community={community} />
        </div>
      </div>

      {isOpen && (
        <div className="card-footer bg-white border-top border-light-subtle px-4 pb-4 pt-3">
          <DayFilter selectedDay={selectedDay} onSelectDay={setSelectedDay} />
          <div className="row g-3 align-items-start">
            <DetailSection 
              title="Jam" icon="calendar-event" count={filteredJams.length}
              isOpen={showJams} onToggle={() => setShowJams(!showJams)}
              items={filteredJams} renderItem={(jam, idx) => <JamCard key={jam.id || idx} jam={jam} />}
              emptyText={selectedDay === 'Tutti' ? "Nessuna jam al momento." : `Nessuna jam il ${selectedDay}.`}
            />
            <DetailSection 
              title="Corsi" icon="mortarboard" count={filteredCourses.length}
              isOpen={showCourses} onToggle={() => setShowCourses(!showCourses)}
              items={filteredCourses} renderItem={(course, idx) => <CourseCard key={course.id || idx} course={course} />}
              emptyText={selectedDay === 'Tutti' ? "Nessun corso disponibile." : `Nessun corso il ${selectedDay}.`}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CommunityCard
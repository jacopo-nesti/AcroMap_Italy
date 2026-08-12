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

      <div 
        onClick={onToggle} 
        className="card-body p-3" 
        style={{ cursor: 'pointer' }} 
        role="button" 
        aria-expanded={isOpen}
      >
        <h3 className="h5 fw-bold mb-1 text-dark" style={{ letterSpacing: '-0.01em', color: '#0f291e' }}>
          {community.name}
        </h3>

        {community.description && (
          <p className="text-secondary small mb-0 mt-1">
            {community.description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className="btn bg-success text-white w-100 rounded-0 d-flex align-items-center justify-content-between px-3 py-2 border-0 fw-semibold"
        style={{ backgroundColor: '#198754' }}
      >
        <span className="small">{isOpen ? 'Mostra meno' : 'Scopri di più'}</span>
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'} ms-2`}></i>
      </button>

      {/* Sezione Espansa */}
      {isOpen && (
        <div className="card-footer bg-white border-top border-light-subtle p-3">
          
          {/* Social Links spostati all'interno */}
          <div className="mb-3">
            <SocialLinks community={community} />
          </div>

          {/* Filtro per giorno */}
          <div className="mb-3">
            <DayFilter selectedDay={selectedDay} onSelectDay={setSelectedDay} />
          </div>

          {/* Sezioni Jam e Corsi */}
          <div className="row g-3 align-items-start">
            <DetailSection 
              title="Mostra le jam" 
              icon="calendar-event" 
              count={filteredJams.length}
              isOpen={showJams} 
              onToggle={() => setShowJams(!showJams)}
              items={filteredJams} 
              renderItem={(jam, idx) => <JamCard key={jam.id || idx} jam={jam} />}
              emptyText={selectedDay === 'Tutti' ? "Nessuna jam al momento." : `Nessuna jam il ${selectedDay}.`}
            />
            <DetailSection 
              title="Mostra i corsi" 
              icon="mortarboard" 
              count={filteredCourses.length}
              isOpen={showCourses} 
              onToggle={() => setShowCourses(!showCourses)}
              items={filteredCourses} 
              renderItem={(course, idx) => <CourseCard key={course.id || idx} course={course} />}
              emptyText={selectedDay === 'Tutti' ? "Nessun corso disponibile." : `Nessun corso il ${selectedDay}.`}
            />
          </div>

        </div>
      )}
    </div>
  )
}

export default CommunityCard
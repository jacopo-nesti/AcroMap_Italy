import { useState, useRef, useEffect } from 'react'
import SocialLinks from './SocialLinks'
import JamCard from './JamCard'
import CourseCard from './CourseCard'
import { sortByDayAndTime } from '../utils/SortingHelper'

// Sottocomponente riutilizzabile per le sezioni Jam e Corsi
function DetailSection({ title, icon, count, isOpen, onToggle, items, renderItem, emptyText }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [isOpen])

  return (
    <div className="col-12 col-md-6">
      <button
        type="button"
        onClick={onToggle}
        className={`btn w-100 py-3 px-3 rounded-3 text-center border transition-all mb-2 ${
          isOpen ? 'btn-success text-white shadow-sm' : 'btn-outline-success border-success-subtle bg-light text-success'
        }`}
        style={{ cursor: 'pointer' }}
      >
        <div className="fw-bold d-flex align-items-center justify-content-center gap-2">
          <i className={`bi bi-${icon}`}></i>
          <span>{title} ({count})</span>
        </div>
        <div className="small opacity-75 mt-1">
          <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
        </div>
      </button>

      {isOpen && (
        <div ref={ref} className="p-3 bg-light rounded-3 border border-success-subtle">
          <h6 className="fw-bold text-success mb-3 small text-uppercase tracking-wider">
            <i className={`bi bi-${icon} me-2`}></i>Elenco {title}
          </h6>
          {count > 0 ? (
            <div className="d-flex flex-column gap-2">
              {items.map(renderItem)}
            </div>
          ) : (
            <p className="text-muted small mb-0 text-center py-2">{emptyText}</p>
          )}
        </div>
      )}
    </div>
  )
}

function CommunityCard({ community, isOpen, onToggle }) {
  const [showJams, setShowJams] = useState(false)
  const [showCourses, setShowCourses] = useState(false)

  const sortedJams = sortByDayAndTime(community.jams || [])
  const sortedCourses = sortByDayAndTime(community.courses || [])

  return (
    <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
      
      {/* Intestazione Cliccabile */}
      <div 
        onClick={onToggle}
        className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center"
        style={{ cursor: 'pointer' }}
        role="button"
        aria-expanded={isOpen}
      >
        <h3 className="h4 fw-bold text-dark mb-0">{community.name}</h3>
        <span className="text-muted fs-5">
          <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
        </span>
      </div>

      {/* Contenuto Espanso */}
      {isOpen && (
        <div className="card-body px-4 pb-4 pt-0">
          
          {community.description && (
            <p className="text-muted small mb-3">{community.description}</p>
          )}

          <div className="mb-4">
            <SocialLinks community={community} />
          </div>

          <div className="row g-3 align-items-start">
            <DetailSection 
              title="Jam"
              icon="calendar-event"
              count={sortedJams.length}
              isOpen={showJams}
              onToggle={() => setShowJams(!showJams)}
              items={sortedJams}
              renderItem={(jam, idx) => <JamCard key={jam.id || idx} jam={jam} />}
              emptyText="Nessuna jam al momento."
            />

            <DetailSection 
              title="Corsi"
              icon="mortarboard"
              count={sortedCourses.length}
              isOpen={showCourses}
              onToggle={() => setShowCourses(!showCourses)}
              items={sortedCourses}
              renderItem={(course, idx) => <CourseCard key={course.id || idx} course={course} />}
              emptyText="Nessun corso disponibile."
            />
          </div>

        </div>
      )}

    </div>
  )
}

export default CommunityCard
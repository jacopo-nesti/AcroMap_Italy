import { useState } from 'react'
import SocialLinks from './SocialLinks'
import JamCard from './JamCard'
import CourseCard from './CourseCard'

function CommunityCard({ community }) {
  const [showJams, setShowJams] = useState(false)
  const [showCourses, setShowCourses] = useState(false)

  const jamCount = community.jams?.length || 0
  const courseCount = community.courses?.length || 0

  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body p-4 d-flex flex-column">
        
        <h3 className="h4 fw-bold text-dark mb-2">{community.name}</h3>
        {community.description && (
          <p className="text-muted small mb-3">{community.description}</p>
        )}

        <div className="mb-3">
          <SocialLinks community={community} />
        </div>

        <div className="d-flex flex-wrap gap-2 mb-4">
          <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-normal">
            <i className="bi bi-calendar-event text-success me-1"></i>
            {jamCount} {jamCount === 1 ? 'Jam disponibile' : 'Jam disponibili'}
          </span>
          <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-normal">
            <i className="bi bi-mortarboard text-success me-1"></i>
            {courseCount} {courseCount === 1 ? 'Corso attivo' : 'Corsi attivi'}
          </span>
        </div>

        <div className="mt-auto d-flex flex-column gap-2">
          
          <button
            className={`btn btn-sm text-start d-flex justify-content-between align-items-center w-100 py-2 px-3 fw-semibold rounded-3 ${
              showJams ? 'btn-success text-white' : 'btn-outline-success'
            }`}
            onClick={() => setShowJams(!showJams)}
            type="button"
          >
            <span>
              <i className="bi bi-calendar-event me-2"></i>
              Jam ({jamCount})
            </span>
            <i className={`bi bi-chevron-${showJams ? 'up' : 'down'}`}></i>
          </button>

          {showJams && (
            <div className="p-3 bg-light rounded-3 mt-1">
              {jamCount > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {community.jams.map((jam, index) => (
                    <JamCard key={jam.id || index} jam={jam} />
                  ))}
                </div>
              ) : (
                <p className="text-muted small mb-0 text-center">Nessuna jam al momento.</p>
              )}
            </div>
          )}

          <button
            className={`btn btn-sm text-start d-flex justify-content-between align-items-center w-100 py-2 px-3 fw-semibold rounded-3 ${
              showCourses ? 'btn-success text-white' : 'btn-outline-success'
            }`}
            onClick={() => setShowCourses(!showCourses)}
            type="button"
          >
            <span>
              <i className="bi bi-mortarboard me-2"></i>
              Corsi ({courseCount})
            </span>
            <i className={`bi bi-chevron-${showCourses ? 'up' : 'down'}`}></i>
          </button>

          {showCourses && (
            <div className="p-3 bg-light rounded-3 mt-1">
              {courseCount > 0 ? (
                <div className="d-flex flex-column gap-2">
                  {community.courses.map((course, index) => (
                    <CourseCard key={course.id || index} course={course} />
                  ))}
                </div>
              ) : (
                <p className="text-muted small mb-0 text-center">Nessun corso disponibile.</p>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default CommunityCard
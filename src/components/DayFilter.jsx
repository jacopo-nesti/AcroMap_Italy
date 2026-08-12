const DAYS = [
  { label: 'Tutti', value: 'Tutti' },
  { label: 'Lun', value: 'Lun' },
  { label: 'Mar', value: 'Mar' },
  { label: 'Mer', value: 'Mer' },
  { label: 'Gio', value: 'Gio' },
  { label: 'Ven', value: 'Ven' },
  { label: 'Sab', value: 'Sab' },
  { label: 'Dom', value: 'Dom' }
]

function DayFilter({ selectedDay, onSelectDay }) {
  return (
    <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2 mb-3">

      <span className="fw-bold text-dark small d-inline-flex align-items-center gap-1 me-1">
        <i className="bi bi-calendar-event-fill" aria-hidden="true" style={{ color: '#15803d' }}></i>
        Filtra per giorno:
      </span>

      <div className="d-flex flex-wrap gap-1" role="group" aria-label="Filtra per giorno">
        {DAYS.map((day) => {
          const isActive = selectedDay === day.value
          return (
            <button
              key={day.value}
              type="button"
              onClick={() => onSelectDay(day.value)}
              aria-pressed={isActive}
              className={`btn btn-sm rounded-pill px-2 py-1 fw-semibold transition-all ${
                isActive ? 'shadow-sm' : 'btn-light border-0'
              }`}
              style={{
                fontSize: '0.85rem',
                backgroundColor: isActive ? '#15803d' : undefined,
                color: isActive ? '#ffffff' : '#334155'
              }}
            >
              {day.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DayFilter
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
        <i className="bi bi-calendar-event-fill text-success"></i>
        Filtra per giorno:
      </span>

      {/* Pulsanti dei giorni */}
      <div className="d-flex flex-wrap gap-1">
        {DAYS.map((day) => {
          const isActive = selectedDay === day.value
          return (
            <button
              key={day.value}
              type="button"
              onClick={() => onSelectDay(day.value)}
              className={`btn btn-sm rounded-pill px-2 py-1 fw-semibold transition-all ${
                isActive
                  ? 'btn-success text-white shadow-sm'
                  : 'btn-light text-secondary border-0'
              }`}
              style={{ fontSize: '0.85rem' }}
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
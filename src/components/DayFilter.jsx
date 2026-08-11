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
    <div className="mb-4">
      <label className="form-label small fw-bold text-uppercase text-secondary mb-2">
        Filtra per giorno
      </label>
      <div className="d-flex flex-wrap gap-1">
        {DAYS.map((day) => {
          const isActive = selectedDay === day.value
           return (
            <button
              key={day.value}
              type="button"
              onClick={() => onSelectDay(day.value)}
              className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold transition-all ${
                isActive
                  ? 'btn-success text-white shadow-sm'
                  : 'btn-light text-secondary border-0'
              }`}
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
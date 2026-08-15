import { useId } from "react"

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
  const selectId = useId()

  return (
    <div className="city-day-filter">
      <label htmlFor={selectId}>
        <i className="bi bi-calendar-event" aria-hidden="true"></i>
        Filtra per giorno
      </label>
      <select id={selectId} value={selectedDay} onChange={(event) => onSelectDay(event.target.value)}>
        {DAYS.map((day) => (
          <option key={day.value} value={day.value}>{day.label}</option>
        ))}
      </select>
    </div>
  )
}

export default DayFilter

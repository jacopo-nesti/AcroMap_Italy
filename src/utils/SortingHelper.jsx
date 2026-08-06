const DAYS_ORDER = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

export function sortByDayAndTime(items = []) {
  return [...items].sort((a, b) => {
    const dayA = DAYS_ORDER.indexOf(a.day) !== -1 ? DAYS_ORDER.indexOf(a.day) : 99;
    const dayB = DAYS_ORDER.indexOf(b.day) !== -1 ? DAYS_ORDER.indexOf(b.day) : 99;
    if (dayA !== dayB) return dayA - dayB;
    return (a.start_time || '').localeCompare(b.start_time || '');
  });
}
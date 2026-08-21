const DAYS_ORDER = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

export function sortByDayAndTime(items = []) {
  return [...items].sort((a, b) => {
    // Le jam variabili restano stabili in fondo; type assente mantiene il comportamento ricorrente.
    const variableA = a.type === 'variable';
    const variableB = b.type === 'variable';
    if (variableA !== variableB) return variableA ? 1 : -1;
    if (variableA) return 0;

    const dayA = DAYS_ORDER.indexOf(a.day) !== -1 ? DAYS_ORDER.indexOf(a.day) : 99;
    const dayB = DAYS_ORDER.indexOf(b.day) !== -1 ? DAYS_ORDER.indexOf(b.day) : 99;
    if (dayA !== dayB) return dayA - dayB;
    return (a.start_time || '').localeCompare(b.start_time || '');
  });
}

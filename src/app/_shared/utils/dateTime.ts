// src/app/utils/date-utils.ts
export function getStartDayOfMonth(year: number, month: number): number {
  const date = new Date(year, month, 1); // months are 0-indexed in JavaScript
  let day = date.getDay(); // getDay returns 0 (Sunday) to 6 (Saturday)
  return day; // shift days so Monday is the first day
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

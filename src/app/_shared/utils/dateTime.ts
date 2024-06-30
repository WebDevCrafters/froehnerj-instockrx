// src/app/utils/date-utils.ts
export function getStartDayOfMonth(year: number, month: number): number {
  const date = new Date(year, month - 1, 1); // months are 0-indexed in JavaScript
  let day = date.getDay(); // getDay returns 0 (Sunday) to 6 (Saturday)
  return day; // shift days so Monday is the first day
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate(); // day 0 of the next month is the last day of the current month
}

export function getPreviousMonthLastDates(
  year: number,
  month: number,
  startDay: number
): number[] {
  const previousMonthDays = getDaysInMonth(year, month - 1);
  const lastDates: number[] = [];
  for (let i = 0; i < startDay; i++) {
    lastDates.unshift(previousMonthDays - i);
  }
  return lastDates;
}

export function getNextMonthStartDates(daysArrayLength: number): number[] {
  const nextMonthDates: number[] = [];
  const totalSlots = Math.ceil(daysArrayLength / 7) * 7; // Calculate the total slots needed to complete the weeks
  const emptySlots = totalSlots - daysArrayLength;

  for (let i = 1; i <= emptySlots; i++) {
    nextMonthDates.push(i);
  }

  return nextMonthDates;
}

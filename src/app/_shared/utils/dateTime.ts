export function getStartDayOfMonth(year: number, month: number): number {
  const date = new Date(year, month, 1); // months are 0-indexed in JavaScript
  let day = date.getDay(); // getDay returns 0 (Sunday) to 6 (Saturday)
  return day; // shift days so Monday is the first day
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dayName = daysOfWeek[date.getDay()];
  const monthName = monthsOfYear[date.getMonth()];
  const dayNumber = date.getDate();

  return `${dayName}, ${monthName} ${dayNumber}`;
}

export function formatTimestampToMMDDYYYY(timestamp: number) {
  const date = new Date(timestamp);

  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-11, so add 1 and pad with zero if needed
  const day = date.getDate().toString().padStart(2, '0'); // pad with zero if needed
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export function mmddyyToTimestamp(dateString: string) {
  const parts = dateString.split('/');

  if (parts.length !== 3) {
    throw new Error('Invalid date format. Please use MM/DD/YY.');
  }

  const month = parseInt(parts[0], 10) - 1;
  const day = parseInt(parts[1], 10);

  const year = parseInt(parts[2], 10) + (parts[2].length < 4 ? 2000 : 0);

  return new Date(year, month, day).getTime();
}

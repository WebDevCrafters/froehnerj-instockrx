import { Component, OnInit } from '@angular/core';
import { getDaysInMonth, getStartDayOfMonth } from '../../utils/dateTime';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent implements OnInit {
  yearSelectionActive: boolean = false;
  dateToday = new Date();
  selectedDay: number = this.dateToday.getDate();
  selectedMonth: number = this.dateToday.getMonth();
  selectedYear: number = this.dateToday.getFullYear();
  yearsArray: number[] = [];
  weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  daysArray: (number | null)[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.selectedDay, 'sdbk');
    this.generateCalendar(this.selectedYear, this.selectedMonth);
    this.generateYearArray();
  }

  generateYearArray() {
    for (let i = this.selectedYear; i < this.selectedYear + 100; i++) {
      this.yearsArray.push(i);
    }
  }

  generateCalendar(year: number, month: number): void {
    this.daysArray = [];
    const startDay = getStartDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);

    console.log({ startDay }, this.weekNames[startDay]);
    for (let i = 0; i < startDay; i++) {
      this.daysArray.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.daysArray.push(i);
    }
  }

  previousMonth() {
    let newMonth = this.selectedMonth - 1;
    if (newMonth === -1) {
      newMonth = 11;
    }
    this.selectedMonth = newMonth;
    this.generateCalendar(this.selectedYear, newMonth);
  }

  nextMonth() {
    const newMonth = (this.selectedMonth + 1) % 12;
    this.selectedMonth = newMonth;
    this.generateCalendar(this.selectedYear, newMonth);
  }

  toggleYearSelection() {
    this.yearSelectionActive = !this.yearSelectionActive;
  }

  onSelectYear(newYear: number) {
    this.selectedYear = newYear;
    this.generateCalendar(newYear, this.selectedMonth);
    this.toggleYearSelection();
  }

  getTimestamp(year: number, month: number, day: number) {
    const date = new Date(year, month, day);
    return date.getTime();
  }

  checkIfPastDay(year: number, month: number, day: number): boolean {
    const inputDate = new Date(year, month, day);
    const startOfToday = new Date(
      this.dateToday.getFullYear(),
      this.dateToday.getMonth(),
      this.dateToday.getDate()
    );
    return inputDate.getTime() < startOfToday.getTime();
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  currentMonth: number = this.dateToday.getMonth();
  currentYear: number = this.dateToday.getFullYear();
  @Output() onDatePicked = new EventEmitter<any>();
  yearsArray: number[] = [];
  daysArray: (number | null)[] = [];
  weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
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

  constructor() {}

  ngOnInit(): void {
    this.generateCalendar(this.currentYear, this.currentMonth);
    this.generateYearArray();
  }

  generateYearArray() {
    for (let i = this.currentYear; i < this.currentYear + 100; i++) {
      this.yearsArray.push(i);
    }
  }

  generateCalendar(year: number, month: number): void {
    this.daysArray = [];
    const startDay = getStartDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);
    console.log(month, daysInMonth);
    for (let i = 0; i < startDay; i++) {
      this.daysArray.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.daysArray.push(i);
    }
  }

  previousMonth() {
    let newMonth = this.currentMonth - 1;
    if (newMonth === -1) {
      newMonth = 11;
      this.currentYear -= 1;
    }
    this.currentMonth = newMonth;
    this.generateCalendar(this.currentYear, newMonth);
  }

  nextMonth() {
    const newMonth = (this.currentMonth + 1) % 12;
    if (newMonth === 0) {
      this.currentYear += 1;
    }
    this.currentMonth = newMonth;
    this.generateCalendar(this.currentYear, newMonth);
  }

  toggleYearSelection() {
    this.yearSelectionActive = !this.yearSelectionActive;
  }

  onSelectYear(newYear: number) {
    this.currentYear = newYear;
    this.generateCalendar(newYear, this.currentMonth);
    this.toggleYearSelection();
  }

  getTimestamp(year: number, month: number, day: number) {
    const date = new Date(year, month, day);
    return date.getTime();
  }

  checkIfPastDay(day: number | null): boolean {
    if (!day) return true;
    const inputDate = new Date(this.currentYear, this.currentMonth, day);
    const startOfToday = new Date(
      this.dateToday.getFullYear(),
      this.dateToday.getMonth(),
      this.dateToday.getDate()
    );
    return inputDate.getTime() < startOfToday.getTime();
  }

  checkIfSelectedDay(day: number | null) {
    if (!day) return false;
    if (
      this.currentYear === this.selectedYear &&
      this.currentMonth === this.selectedMonth &&
      day === this.selectedDay
    ) {
      return true;
    }
    return false;
  }

  onSelectDay(day: number | null) {
    if (!day) return;
    if (this.checkIfPastDay(day)) return;

    this.selectedDay = day;
    this.selectedMonth = this.currentMonth;
    this.selectedYear = this.currentYear;
    this.onDatePicked.emit(
      new Date(this.selectedYear, this.selectedMonth, day).getTime()
    );
  }
}

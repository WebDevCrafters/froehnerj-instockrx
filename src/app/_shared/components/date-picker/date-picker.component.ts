import { Component, OnInit } from '@angular/core';
import {
  getDaysInMonth,
  getNextMonthStartDates,
  getPreviousMonthLastDates,
  getStartDayOfMonth,
} from '../../utils/dateTime';
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
    console.log(0);
    this.generateCalendar(this.selectedYear, this.selectedMonth);
    this.generateYearArray();
  }

  generateYearArray() {
    for (let i = this.selectedYear; i < this.selectedYear + 100; i++) {
      this.yearsArray.push(i);
    }
    console.log(this.yearsArray);
  }
  
  generateCalendar(year: number, month: number): void {
    this.daysArray = [];
    const startDay = getStartDayOfMonth(year, month); // Day of the week the month starts on (0-6, Monday = 0)
    const daysInMonth = getDaysInMonth(year, month); // Number of days in the month

    console.log({ startDay }, this.weekNames[startDay]);
    for (let i = 0; i < startDay; i++) {
      this.daysArray.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.daysArray.push(i);
    }
  }

  previousMonth() {
    const newMonth = this.selectedMonth - 1;
    this.selectedMonth = newMonth;
    this.generateCalendar(this.selectedYear, newMonth);
  }

  nextMonth() {
    const newMonth = this.selectedMonth + 1;
    this.selectedMonth = newMonth;
    this.generateCalendar(this.selectedYear, newMonth);
  }

  toggleYearSelection() {
    this.yearSelectionActive = !this.yearSelectionActive;
  }

  onSelectYear(newYear: number){
    this.selectedYear = newYear;
    this.generateCalendar(newYear, this.selectedMonth)
    this.toggleYearSelection();
  }
}

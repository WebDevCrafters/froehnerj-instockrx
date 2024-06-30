import { Component, OnInit } from '@angular/core';
import {
  getDaysInMonth,
  getNextMonthStartDates,
  getPreviousMonthLastDates,
  getStartDayOfMonth,
} from '../../utils/dateTime';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent implements OnInit {
  month: number = 6; // June
  year: number = 2024; // Default year
  weekArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
    this.generateCalendar(this.year, this.month);
  }

  generateCalendar(year: number, month: number): void {
    console.log(year, month);
    const startDay = getStartDayOfMonth(year, month); // Day of the week the month starts on (0-6, Monday = 0)
    const daysInMonth = getDaysInMonth(year, month); // Number of days in the month

    console.log({ startDay }, this.weekArr[startDay]);
    for (let i = 0; i < startDay; i++) {
      this.daysArray.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      this.daysArray.push(i);
    }
  }

  previousMonth() {
    const newMonth = this.month - 1;
    this.month = newMonth;
    this.daysArray = [];
    this.generateCalendar(this.year, newMonth);
  }

  nextMonth() {
    const newMonth = this.month + 1;
    this.month = newMonth;
    this.daysArray = [];
    this.generateCalendar(this.year, newMonth);
  }
}

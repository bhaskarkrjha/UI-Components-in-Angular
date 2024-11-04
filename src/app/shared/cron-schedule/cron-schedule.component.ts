import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-cron-schedule',
  templateUrl: './cron-schedule.component.html',
  styleUrl: './cron-schedule.component.scss'
})
export class CronScheduleComponent implements OnInit{
  @Output() formDataChange = new EventEmitter<any>();
  @Output() isFormValid = new EventEmitter<boolean>();
  repeatsSelected: any = null;
  repeatsOptionList: any = [
    {
      name: 'Hourly',
      value: 'Hourly',
    },
    {
      name: 'Daily',
      value: 'Daily',
    },
    {
      name: 'Every Weekday (Monday To Friday)',
      value: 'monday,tuesday,wednesday,thursday,friday',
    },
    {
      name: 'Every Monday,Wednesday and Friday',
      value: 'monday,wednesday,friday',
    },
    {
      name: 'Every Tuesday and Thursday',
      value: 'tuesday,thursday',
    },
    {
      name: 'Weekly',
      value: 'Weekly',
    },
  ];
  date1: any = null;
  startDate = new Date();
  setEndDate: boolean = false;
  date2: any = null;
  endDate = new Date();
  time1: any = null;
  isTimeBeforeCurrent: boolean = false;
  days = [
    { name: 'Mo', value: 'Monday' },
    { name: 'Tu', value: 'Tuesday' },
    { name: 'We', value: 'Wednesday' },
    { name: 'Th', value: 'Thursday' },
    { name: 'Fr', value: 'Friday' },
    { name: 'Sa', value: 'Saturday' },
    { name: 'Su', value: 'Sunday' },
  ];
  selectedDay: { name: string; value: string } | null = null;
  constructor() {}

  ngOnInit(): void {}
  onRepeatsSelection(e) {
    console.log(e?.name, 'repeats');
    this.repeatsSelected = e;
    this.date1 = null;
    this.startDate = new Date();
    this.date2 = null;
    this.endDate = new Date();
    this.time1 = null;
    this.selectedDay = null;
    this.setEndDate = null;
    this.emitFormData();
  }
  emitFormData() {
    let isValid = false;
    // Check validation based on selected repeat option
    if (this.repeatsSelected?.value.toLowerCase() === 'hourly') {
      // Only startDate is required
      isValid = !!this.date1 && (!this.setEndDate || (this.setEndDate && !!this.date2));
    } else if (
      this.repeatsSelected?.value.toLowerCase() === 'daily' ||
      this.repeatsSelected?.value === 'monday,tuesday,wednesday,thursday,friday' ||
      this.repeatsSelected?.value === 'monday,wednesday,friday' ||
      this.repeatsSelected?.value === 'tuesday,thursday'
    ) {
      // sendAt time, startDate, and optional endDate
      isValid =
        !!this.time1 &&
        !!this.date1 &&
        (!this.setEndDate || (this.setEndDate && !!this.date2)) &&
        !this.isTimeBeforeCurrent;
    } else if (this.repeatsSelected?.value.toLowerCase() === 'weekly') {
      // sendAt time, selected day, startDate, and optional endDate
      isValid =
        !!this.time1 &&
        !!this.selectedDay &&
        !!this.date1 &&
        (!this.setEndDate || (this.setEndDate && !!this.date2)) &&
        !this.isTimeBeforeCurrent;
    }

    this.isFormValid.emit(isValid);

    this.formDataChange.emit({
      repeatsSelected: this.repeatsSelected?.value,
      send_at: this.time1 ? moment(this.time1, 'HH:mm:ss').format('hh:mm A') : null,
      startDate: this.date1 ? this.getDateAndTime(this.date1) : null,
      endDate: this.date2 ? this.getDateAndTime(this.date2) : null,
      repeats_on: this.selectedDay?.value ?? null,
    });
  }
  resetForm() {
    this.repeatsSelected = null;
    this.date1 = null;
    this.startDate = new Date();
    this.date2 = null;
    this.endDate = new Date();
    this.time1 = null;
    this.selectedDay = null;
    this.setEndDate = null;
    this.emitFormData();
    console.log(this.repeatsSelected, this.startDate);
  }
  onDate1Change(date: Date | null) {
    this.date1 = date;
    if (date) {
      this.startDate = new Date(date);
      if (this.startDate > new Date()) {
        this.startDate = new Date();
      }
      this.validateDateTime();
    }
    this.emitFormData();
  }
  getDateAndTime(date) {
    return moment(date).format('YYYY-MM-DD');
  }
  addEndDate(event: any) {
    this.setEndDate = event;
    if (!this.setEndDate) {
      this.date2 = null;
      this.endDate = null;
    }
    this.emitFormData();
  }
  onDate2Change(date: Date | null) {
    this.date2 = date;
    if (date) {
      this.endDate = new Date(date);
      if (this.endDate > new Date()) {
        this.endDate = new Date();
      }
    }
    this.emitFormData();
  }
  onTime1Change(e) {
    console.log(e);
    this.time1 = e.target.value;
    this.time1 = moment(this.time1, 'hh:mm:ss A').format('HH:mm:ss');
    this.validateDateTime();
  }
  validateDateTime() {
    const currentDate = moment().format('YYYY-MM-DD');
    const currentDateTime = moment();

    // If no date is selected, allow only future times
    if (!this.date1) {
      const selectedTime = moment(this.time1, 'HH:mm:ss');
      this.isTimeBeforeCurrent = selectedTime.isSameOrBefore(currentDateTime);
      return;
    }

    const selectedDate = moment(this.date1).format('YYYY-MM-DD');
    const selectedDateTime = moment(`${selectedDate} ${this.time1}`, 'YYYY-MM-DD HH:mm:ss');

    if (selectedDate === currentDate) {
      // If the selected date is today, allow only future times
      this.isTimeBeforeCurrent = selectedDateTime.isSameOrBefore(currentDateTime);
    } else if (moment(this.date1).isAfter(currentDate)) {
      // If the selected start date is in the future, allow selecting past times
      this.isTimeBeforeCurrent = false;
    } else {
      // Default behavior for past dates
      this.isTimeBeforeCurrent = selectedDateTime.isBefore(currentDateTime);
    }

    this.emitFormData();
  }
  isSelected(day: { name: string; value: string }): boolean {
    return this.selectedDay?.value === day.value;
  }
  selectDay(day: { name: string; value: string }): void {
    this.selectedDay = day;
    console.log(this.selectedDay, 'day');
    this.emitFormData();
  }
}

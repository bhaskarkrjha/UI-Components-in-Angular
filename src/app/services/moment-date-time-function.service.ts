import { Injectable } from '@angular/core';
import moment from 'moment';
const fallBackDate = '1970-01-01T00:00:00.000Z'; // in case of any date is blank
const formatList = [
  'DD-MM-YYYY HH:mm:ss',
  'DD-MM-YYYY h:mm:ss A',
  'DD-MMM-YY HH:mm:ss',
  'DD-MM-YY HH:mm',
  'DD-MM-YYYY HH:mm A',
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'MM/DD/YYYY',
  'YYYY-MM-DDTHH:mm:ss.SSSSZ',
  'YYYY-MM-DDTHH:mm:ss',
  'YYYY-MM-DDTHH:mm',
  'DD-MMM-YYYY',
  'DD-MM-YYYY HH:mm',
]; //do not remove any format.
const findDateTimeInputFormat = function (inputDateTime: any): string {
  return '' + moment(inputDateTime || fallBackDate, formatList, true).creationData()?.format; // find format to convert in date object
};
@Injectable({
  providedIn: 'root',
})
export class MomentDateTimeFunctionService {
  constructor() { }
  /*
   * Below function is only applicable to date-time as string sorting in ngx datatable
   *
   * private momentDateTimeFunctionService: MomentDateTimeFunctionService,
   *
   * Before passing to HTML for render:
   * resp?.columnDefs?.map(col => col?.type?.toLowerCase() === 'datetime' ? { ...col, comparator: this.momentDateTimeFunctionService.dataRowKomparator } : col);
   *
   * <ngx-datatable-column  *ngFor="let column of columnDefs" [name]="column?.name" [prop]="column?.prop" [comparator]="column?.comparator"> .. ... ..</ngx-datatable-column>
   *
   *  formatList on top: append your format in moment parsing format if not present // refer https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/
   *
   */
  dataRowKomparator(propA: any, propB: any, rowA: any, rowB: any, sortDirection: any, format?: string | boolean | undefined): 1 | -1 | 0 {
    // console.log('Sorting Comparator', propA, propB, rowA, rowB, sortDirection, format);
    // if (!format) {
    format = findDateTimeInputFormat(propA || propB);
    // }
    const defaultDate = moment(fallBackDate, format);
    // console.log(fallBackDate, format, defaultDate);
    const dateA = moment(propA || defaultDate, format)?.toDate();
    const dateB = moment(propB || defaultDate, format)?.toDate();
    // console.log('dateA :', dateA, 'dateB:', dateB);
    // do something with rowA and rowB objects.
    return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
  }

  convert2customformat(dateTime: any, format2use: string): string {
    const format = findDateTimeInputFormat(dateTime);
    return moment(dateTime, format).format(format2use);
  }

  customDate() {
    const previouDate = moment().subtract(1, 'days');
    const now = previouDate.format('MMM DD YYYY').split(' ');
    const month = now[0];
    const currentDate = now[1];
    const currMonthDate = previouDate.daysInMonth();
    const year = now[2];
    const customDateRange = {
      recentDateValue: `1 ${month} - ${currentDate} ${month} ${year}`,
      currentMonthDate: `1 ${month} - ${currMonthDate} ${month} ${year}`,
    };
    return customDateRange;
  }

  getTimeFormatList() {
    return formatList;
  }
}

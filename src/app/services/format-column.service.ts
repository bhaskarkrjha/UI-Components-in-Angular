import { Injectable } from '@angular/core';
import { MomentDateTimeFunctionService } from './moment-date-time-function.service';

@Injectable({
  providedIn: 'root',
})
export class FormatColumnService {
  constructor(private momentDateTimeFunctionService: MomentDateTimeFunctionService) {}

  formatColumnDef(columnDefs: any): any {
    const commonClass = 'bg-transparent';
    return columnDefs
      ?.sort((x: { order: string | number }, y: { order: string | number }) => {
        return +x?.order - +y?.order;
      })
      ?.map((col: {
        comparator: any; type: string 
}) => {
        const lowerCaseType = col?.type?.toLowerCase();

        // Add the necessary classes and comparator based on the column type
        return {
          ...col,
          cellClass: lowerCaseType === 'number' ? `text-right ${commonClass}` : `text-left ${commonClass}`,
          headerClass: lowerCaseType === 'number' ? `text-right ${commonClass}` : `text-left ${commonClass}`,
          comparator: lowerCaseType === 'datetime' ? this.momentDateTimeFunctionService.dataRowKomparator : col?.comparator,
        };
      });
  }
}

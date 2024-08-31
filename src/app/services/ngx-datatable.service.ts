import { Injectable } from '@angular/core';

import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
@Injectable({
  providedIn: 'root',
})
export class NgxDatatableService {
  config: any = {
    headerHeight: 48,
    headerHeightsm: 40,
    footerHeight: 50,
    footerHeightsm: 38,
    rowHeight: 40,
    rowHeightsm: 32,
    rowHeightmd: 64,
    rowHeightml: 85,
    rowHeightlg: 96,
    rowHeightAuto: 'auto',
    limit: 25,
    scrollbarV: true,
    scrollbarH: true,
    columnMode: ColumnMode?.force,
    columnModeFlex: ColumnMode?.flex,
    columnModeStandard: ColumnMode?.standard,
    selectionType: SelectionType,
    checkbox: SelectionType?.checkbox,
  };

  constructor() {}
}

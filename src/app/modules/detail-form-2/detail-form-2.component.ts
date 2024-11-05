import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationPatternService } from '../../services/validation-pattern.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NgxDatatableService } from '../../services/ngx-datatable.service';
import { FormatColumnService } from '../../services/format-column.service';
@Component({
  selector: 'app-detail-form-2',
  templateUrl: './detail-form-2.component.html',
  styleUrl: './detail-form-2.component.scss',
})
export class DetailForm2Component implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  ngxService: any;
  skudriverForm: FormGroup;
  driverVariableList: any = [];
  viewDriverList: any = [];
  connectionColumns: any = [
    {
      name: 'Name',
      prop: 'name',
    },
    {
      name: 'Drive',
      prop: 'drive',
    },
  ];
  rowData: any = [];
  rowDataCopy: any = [];
  columnDefs: any = [];
  columnDefs2search: any = [];
  selected = [];
  disableSearch: boolean;
  showtable: boolean = false;
  showResources: boolean;
  filterData: any;
  constructor(
    private formBuilder: FormBuilder,
    public validationPattern: ValidationPatternService,
    private _snackBar: MatSnackBar,
    private ngxDTService: NgxDatatableService,
    private formatColumnService: FormatColumnService
  ) {
    this.ngxService = this.ngxDTService;
  }
  ngOnInit(): void {
    this.driverVariableList = [
      {
        name: 'Car Driver',
        value: 1,
      },
      {
        name: 'Auto Driver',
        value: 2,
      },
      {
        name: 'Bus Driver',
        value: 3,
      },
      {
        name: 'Train Driver',
        value: 4,
      },
    ];
    this.skudriverForm = this.formBuilder.group({
      driverFormArray: this.formBuilder.array([]),
    });
    this.addDriver();
  }
  addDriver(data = null) {
    this.driverFormList().push(this.payloadFormDriverList(data));
  }
  driverFormList(): FormArray {
    return this.skudriverForm.get('driverFormArray') as FormArray;
  }
  getDriverControl(index, fieldName) {
    return (<FormArray>this.skudriverForm.get('driverFormArray'))
      .at(index)
      .get(fieldName);
  }
  payloadFormDriverList(val) {
    if (val) {
      return this.formBuilder.group({
        driverName: [
          val?.driverName,
          [
            Validators.required,
            Validators.maxLength(30),
            Validators.pattern(this.validationPattern?.alphaNumericOnly),
          ],
        ],
        driverVariable: [val?.name, Validators.required],
      });
    } else {
      return this.formBuilder.group({
        driverName: [
          '',
          [
            Validators.required,
            Validators.maxLength(30),
            Validators.pattern(this.validationPattern?.alphaNumericOnly),
          ],
        ],
        driverVariable: [null, Validators.required],
      });
    }
  }
  conditioValuenOnChange(e, formControl: FormGroup) {
    formControl?.patchValue({ driverVariable: e?.name });
    console.log(this.skudriverForm);
  }
  removeFn(i) {
    this.driverFormList().removeAt(i);
  }
  clearControl(control) {
    control.setValue('');
  }
  reset() {
    this.driverFormList().clear();
    this.addDriver();
    this.viewDriverList = [];
  }
  createMappingGroup() {
    this.viewDriverList = [];
    this.viewDriverList = this.driverFormList()?.value;
    console.log(this.viewDriverList, 'x');
    this.filterData = {};
    this.filterData = this.viewDriverList.map((item) => ({
      name: item?.driverName,
      drive: item?.driverVariable,
    }));
    // Case1 : check connections are already exist in newly added connection
    if (this.rowData?.length) {
      const connectionCreated = this.filterData.some((filterItem) =>
        this.rowData.some(
          (rowItem) =>
            rowItem.name?.toLowerCase() === filterItem.name?.toLowerCase()
        )
      );
      if (connectionCreated) {
        this._snackBar.open('Driver detail already added', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        return;
      }
    }
    // Add the new connection to the list
    this.rowData.push(...this.filterData);
    this.reset();
    console.log(this.rowData, 'row data');
    this.showResources = true;
    this.showtable = false;
    this.selected = [];
    this.columnDefs = this.formatColumnService.formatColumnDef(
      this.connectionColumns
    );
    this.columnDefs2search =
      this.connectionColumns?.map((col) => col?.prop) ?? [];
    setTimeout(() => {
      this.showtable = true;
    }, 555);
    this.addingUniqueId();
    this.rowDataCopy = [...this.rowData];
    if (!this.rowDataCopy?.length) this.disableSearch = true;
  }
  addingUniqueId() {
    let counter = 0;
    this.rowData.forEach((item) => {
      item.id = counter;
      counter++;
      return item;
    });
    console.log('xx', this.rowData);
  }
  deleteConnection() {
    this.rowData = this.rowData?.filter((itm) => {
      return !this.selected.find((elem) => itm.id === elem.id);
    });
    this.addingUniqueId();
    this.rowDataCopy = [...this.rowData];
    this._snackBar.open('Driver(s) deleted', 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.selected = [];
    if (!this.rowDataCopy?.length) this.disableSearch = true;
  }

  applySearch($event) {
    console.log($event);
    this.rowData = $event;
  }
  someComplete(): boolean {
    if (
      this.selected?.length === 0 ||
      this.selected?.length === this.rowData?.length
    ) {
      return false;
    } else {
      return true;
    }
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected.filter((item) => item));
    this.selected = [...this.selected];
  }
}

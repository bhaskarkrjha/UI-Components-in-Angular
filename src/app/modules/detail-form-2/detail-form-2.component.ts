import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationPatternService } from '../../services/validation-pattern.service';

@Component({
  selector: 'app-detail-form-2',
  templateUrl: './detail-form-2.component.html',
  styleUrl: './detail-form-2.component.scss',
})
export class DetailForm2Component implements OnInit {
  skudriverForm: FormGroup;
  driverVariableList: any = [];
  viewDriverList : any = [];
  constructor(
    private formBuilder: FormBuilder,
    public validationPattern: ValidationPatternService
  ) {}
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
  driverFormList(): FormArray {
    return this.skudriverForm.get('driverFormArray') as FormArray;
  }
  getDriverControl(index, fieldName) {
    return (<FormArray>this.skudriverForm.get('driverFormArray'))
      .at(index)
      .get(fieldName);
  }
  addDriver(data = null) {
    this.driverFormList().push(this.payloadFormDriverList(data));
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
  conditioValuenOnChange(e, formControl : FormGroup) {
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
  }
}

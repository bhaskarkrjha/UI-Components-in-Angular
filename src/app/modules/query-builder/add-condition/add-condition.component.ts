import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-condition',
  templateUrl: './add-condition.component.html',
  styleUrl: './add-condition.component.scss'
})
export class AddConditionComponent implements OnInit{
  @Input() rule: any = {};
  @Input() groupLevel: number = 0;
  @Input() groupIndex: number = 0;
  @Output() conditionFormData = new EventEmitter<any>();
  @Output() handleDelete = new EventEmitter<number>();
  conditionForm: FormGroup;
  operatorList = [
    {
      label: 'equal to',
      value: '=',
    },
    {
      label: 'not equal to',
      value: '!=',
    },
    {
      label: 'starts from',
      value: 'like1',
    },
    {
      label: 'contains',
      value: 'like2',
    },
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.conditionForm = this.fb.group({
      name: [this.rule.name, Validators.required],
      operator: [this.rule.operator, Validators.required],
      value: [this.rule.value, Validators.required],
    });
    this.conditionForm.valueChanges.subscribe(() => this.emitFormData());
    console.log('add-condition form', this.conditionForm);
  }
  emitFormData(event = null) {
    if (event) {
      this.conditionForm.patchValue({ operator: event?.value});
    }
    console.log(this.conditionForm.value);
    this.conditionFormData.emit({ formData: this.conditionForm.value, index: this.groupIndex });
  }
  handleDeleteRule(id: string) {
    this.handleDelete.emit(this.groupIndex);
  }
}

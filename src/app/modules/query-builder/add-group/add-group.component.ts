import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {
  QueryBuilderService,
  Group,
  Rule,
} from '../../../services/query-builder.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.scss'
})
export class AddGroupComponent implements OnInit, OnChanges {
  @Input() query: Group = { id: '', type: 'group', condition: '', rules: [], hasGroups: true }; // Updated interface
  @Input() groupLevel = -1;
  @Input() groupIndex = 0;

  @Output() handleDelete = new EventEmitter<number>();
  @Output() jsonData = new EventEmitter<{ value: Group; validCheck: boolean }>();

  @Input() queryForm: FormGroup;
  @Input() resetForm: boolean;

  constructor(private fb: FormBuilder, private queryBuilderService: QueryBuilderService) {}

  ngOnInit() {
    if (!this.queryForm) {
      this.initializeGroup();
    }

    console.log('QueryForm', this.queryForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.resetForm?.currentValue) {
      console.log(this.query);
      this.initializeGroup();
      this.initRules(this.query?.rules, this.queryForm);
    }
  }

  initializeGroup() {
    this.queryForm = this.createGroupGroup(this.query?.id ? this.query : this.queryBuilderService.getNewGroup());
    this.queryForm.valueChanges.subscribe(() => this.emitJsonData());
  }

  initRules(rules: (Rule | Group)[], form: FormGroup) {
    console.log('RULES', rules);
    const rulesFormArray = form.get('rules') as FormArray;
    console.log('rulesFormArray', rulesFormArray);
    rules?.forEach((rule) => {
      if (rule?.type === 'rule') {
        console.log(rule);
        rulesFormArray.push(this.createRuleGroup(rule as Rule));
      } else {
        const tempForm = this.createGroupGroup(rule as Group);
        console.log(rule, tempForm);
        if (rule?.rules?.length) this.initRules(rule?.rules, tempForm);
        rulesFormArray.push(tempForm);
      }
    });
  }

  createRuleGroup(rule: Rule): FormGroup {
    return this.fb.group({
      type: 'rule',
      id: [rule.id],
      hasGroups: [rule.hasGroups],
      name: [rule.name, Validators.required],
      operator : [rule.operator, Validators.required],
      value: [rule.value, Validators.required],
    });
  }

  createGroupGroup(group: Group): FormGroup {
    return this.fb.group({
      type: 'group',
      id: [group.id],
      hasGroups: [group.hasGroups],
      condition: [group.condition, Validators.required],
      // query: this.createGroupForm(group)
      rules: this.fb.array([], Validators?.required),
    });
  }

  createGroupForm(group: Group): FormGroup {
    const groupForm = this.fb.group({
      condition: [group.condition, Validators.required],
      rules: this.fb.array([]),
    });

    return groupForm;
  }

  handleAddRule() {
    const rulesFormArray = this.queryForm.get('rules') as FormArray;
    rulesFormArray.push(this.createRuleGroup(this.queryBuilderService.getNewRule()));
    this.sortRules();
  }

  handleAddGroup() {
    const rulesFormArray = this.queryForm.get('rules') as FormArray;
    rulesFormArray.push(this.createGroupGroup(this.queryBuilderService.getNewGroup()));
    this.sortRules();
  }

  handleDeleteGroup() {
    const rulesFormArray = this.queryForm.get('rules') as FormArray;

    this.handleDelete.emit(this.groupIndex);
    this.emitJsonData();
  }

  handleChildDelete(groupIndex: number) {
    const rulesFormArray = this.queryForm.get('rules') as FormArray;
    rulesFormArray.removeAt(groupIndex);
    if (!rulesFormArray?.length) this.handleDeleteGroup();
    this.emitJsonData();
  }

  sortRules() {
    const rulesFormArray = this.queryForm.get('rules') as FormArray;
    rulesFormArray.controls.sort((a, b) => {
      const typeA = a.value.type === 'rule' ? 0 : 1;
      const typeB = b.value.type === 'rule' ? 0 : 1;
      return typeA - typeB;
    });
    this.emitJsonData();
  }

  emitJsonData() {
    this.jsonData.emit({ value: this.queryForm?.value, validCheck: this.queryForm.valid });
    console.log(this.queryForm);
  }

  handleConditionFormData(data: { formData: any; index: number }) {
    console.log('Received condition form data:', data);

    const rulesFormArray = this.queryForm.get('rules') as FormArray;

    if (rulesFormArray && rulesFormArray.length > data.index) {
      const ruleGroup = rulesFormArray.at(data.index) as FormGroup;
      ruleGroup.patchValue(data.formData);
    }
  }
}

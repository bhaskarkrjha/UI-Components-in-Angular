import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrl: './dropdown-filter.component.scss',
})
export class DropdownFilterComponent implements OnInit {
  singleSelectOptions: any = [];
  multiSelectOptions: any = [];
  groupedMultiSelectOptions: any = [];

  selectedSingleValue: any = {};
  selectedMultiValues: any = [];
  selectedGroupedMultiValues: any = [];
  constructor() {}
  ngOnInit(): void {
    console.log('dropdowns');
    this.singleSelectOptions = [
      {
        id: 1,
        name: 'Option 1',
      },
      {
        id: 2,
        name: 'Option 2',
      },
      {
        id: 3,
        name: 'Option 3',
      },
    ];
    this.multiSelectOptions = [
      {
        id: 4,
        name: 'Option 4',
      },
      {
        id: 5,
        name: 'Option 5',
      },
      {
        id: 6,
        name: 'Option 6',
      },
    ];
    this.groupedMultiSelectOptions = [
      {
        id: 1,
        name: 'Option 1',
        group: 'Group A',
      },
      {
        id: 2,
        name: 'Option 2',
        group: 'Group A',
      },
      {
        id: 3,
        name: 'Option 3',
        group: 'Group A',
      },
      {
        id: 4,
        name: 'Option 1',
        group: 'Group B',
      },
      {
        id: 5,
        name: 'Option 2',
        group: 'Group B',
      },
      {
        id: 6,
        name: 'Option 3',
        group: 'Group B',
      },
      {
        id: 7,
        name: 'Option 1',
        group: 'Group C',
      },
      {
        id: 8,
        name: 'Option 2',
        group: 'Group C',
      },
      {
        id: 9,
        name: 'Option 3',
        group: 'Group C',
      },
    ];
    this.selectedSingleValue = this.singleSelectOptions[1];
    this.selectedMultiValues = this.multiSelectOptions;
    this.selectedGroupedMultiValues = this.groupedMultiSelectOptions;
  }
  onSingleSelectChange(e){
    this.selectedSingleValue = e;
    console.log('sigle select',this.selectedSingleValue);
  }
  onMultiSelectChange(e){
    this.selectedMultiValues = e;
    console.log('multi select',this.selectedMultiValues);
  }
  onGroupedMultiSelectChange(e){
    this.selectedGroupedMultiValues = e;
    console.log('grouped multi select',this.selectedGroupedMultiValues);
  }

}

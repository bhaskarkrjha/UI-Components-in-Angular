import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
// import { NgSelectComponent } from '@ng-select/ng-select';
// interface DropdownOption {
//   id: string | number;
//   name: string;
//   group?: string;
//   [key: string]: any; // For additional properties
// }

// @Component({
//   selector: 'app-dropdown',
//   templateUrl: './dropdown.component.html',
//   styleUrl: './dropdown.component.scss'
// })
// export class DropdownComponent implements OnInit, OnChanges {
//   @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent;

//   @Input() optionList: DropdownOption[] = [];
//   @Input() bindLabel: string = 'name';
//   @Input() bindValue: string = 'id';
//   @Input() groupBy: string = 'group';
//   @Input() multiple: boolean = false;
//   @Input() clearable: boolean = false;
//   @Input() disabled: boolean = false;
//   @Input() selectableGroup: boolean = true;
//   @Input() closeOnSelect: boolean = false;
//   @Input() selectableGroupAsModel: boolean = false;
//   @Input() selectedValue: DropdownOption | DropdownOption[] | null = null;
//   @Input() title: string = 'Please Select';
//   @Input() showClearIcon: boolean = true;
//   @Input() isRequired: boolean = false;
//   @Input() virtualScroll: boolean = true;

//   @Output() selectionChange = new EventEmitter<DropdownOption[]>();
//   @Output() scrollToEndSearch = new EventEmitter<void>();

//   selectedItems: DropdownOption[] = [];
//   filteredOptions: DropdownOption[] = [];
//   dataLoaded: boolean = false;

//   ngOnInit(): void {
//     this.filteredOptions = [...this.optionList];
//     this.initializeSelection();
//     this.dataLoaded = true;
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['selectedValue']) {
//       this.initializeSelection();
//     }
//     if (changes['optionList']) {
//       this.filteredOptions = [...this.optionList];
//     }
//     if (changes['isRequired']) {
//       this.isRequired = changes['isRequired'].currentValue;
//     }
//   }

//   onScrollToEnd(): void {
//     if (this.virtualScroll) {
//       this.scrollToEndSearch.emit();
//     }
//   }

//   private initializeSelection(): void {
//     if (this.selectedValue) {
//       if (this.multiple && Array.isArray(this.selectedValue)) {
//         this.selectedItems = this.getUniqueOptions(this.selectedValue);
//       } else if (!this.multiple && !Array.isArray(this.selectedValue)) {
//         this.selectedItems = [this.selectedValue];
//       }
//     } else {
//       this.selectedItems = this.multiple ? [] : [];
//     }
//   }

//   private getUniqueOptions(options: DropdownOption[]): DropdownOption[] {
//     const seen = new Set();
//     return options.filter((option) => {
//       const key = this.getCompareValue(option);
//       if (seen.has(key)) return false;
//       seen.add(key);
//       return true;
//     });
//   }

//   private getCompareValue(item: DropdownOption): any {
//     return item ? item[this.bindValue] : item;
//   }

//   compareFn = (item1: DropdownOption, item2: DropdownOption): boolean => {
//     return this.getCompareValue(item1) === this.getCompareValue(item2);
//   };

//   toggleSelectAll(checked: boolean): void {
//     if (checked) {
//       this.selectedItems = this.getUniqueOptions([...this.selectedItems, ...this.filteredOptions]);
//     } else {
//       this.selectedItems = this.selectedItems.filter(
//         (item) => !this.filteredOptions.some((filteredItem) => this.getCompareValue(filteredItem) === this.getCompareValue(item))
//       );
//     }
//     this.emitSelection();
//   }

//   onSelectionChange(event: any): void {
//     if (this.multiple) {
//       const newSelection = event.map((item: any) =>
//         typeof item === 'object' ? item : this.optionList.find((opt) => opt[this.bindValue] === item)
//       );
//       this.selectedItems = this.getUniqueOptions([...newSelection]);
//     } else {
//       this.selectedItems = event ? [event] : [];
//       this.resetSearch();
//       this.ngSelect.close();
//     }
//     this.emitSelection();
//   }

//   emitSelection(): void {
//     this.selectionChange.emit(this.selectedItems);
//   }

//   resetSearch(): void {
//     this.ngSelect.searchTerm = '';
//   }
// }

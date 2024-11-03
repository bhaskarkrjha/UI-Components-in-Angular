import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
interface DropdownOption {
  id: string | number;
  name: string;
  group?: string;
  [key: string]: any; // For additional properties
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements OnInit, OnChanges {
    @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent;
    @Input() optionList: any[] = [];
    @Input() bindLabel: string = 'name';
    @Input() bindValue: string = 'id';
    @Input() groupBy: string = 'group';
    @Input() multiple: boolean = false;
    @Input() clearable: boolean = false;
    @Input() disabled: boolean = false;
    @Input() selectableGroup: boolean = true;
    @Input() closeOnSelect: boolean = false;
    @Input() selectableGroupAsModel: boolean = false;
    @Input() selectedValue: any;
    @Input() title: string = 'Please Select';
    @Input() isClear = true; //to display the clear icon in chips
    @Input() isRequired: boolean = false;
    @Input() virtualScroll = true;
    @Input() class : any ='w-100';
    @Output() selectionChange = new EventEmitter<any>();
    @Output() scrollToEndSearch = new EventEmitter<any>();
    selectedItems: any[] = [];
    filteredOptions: any[] = [];
    currentSearchTerm: string = '';
    isOpen: boolean = false;
    dataLoaded : boolean = false;
  
    ngOnInit(): void {
      this.filteredOptions = [...this.optionList];
      this.initializeSelection();
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes['selectedValue']) {
        this.initializeSelection();
      }
      if (changes['optionList']) {
        this.filteredOptions = [...this.optionList];
      }
      if (changes.isRequired) {
        this.isRequired = changes.isRequired.currentValue;
      }
    }
    onScrollToEnd($event) {
      if (this.virtualScroll) {
        this.scrollToEndSearch.emit(true);
      }
    }
  
    private initializeSelection() {
      if (this.selectedValue) {
        if (this.multiple) {
          this.selectedItems = this.optionList.filter((option) =>
            this.selectedValue.some((selected: any) => this.getCompareValue(selected) === this.getCompareValue(option)),
          );
        } else {
          this.selectedItems =
            this.optionList.find((option) => this.getCompareValue(this.selectedValue) === this.getCompareValue(option)) ||
            null;
        }
      } else {
        this.selectedItems = this.multiple ? [] : null;
      }
      this.dataLoaded = true;
    }
  
    private getCompareValue(item: any): any {
      return item && typeof item === 'object' ? item[this.bindValue] : item;
    }
  
    compareFn = (item1: any, item2: any): boolean => {
      return this.getCompareValue(item1) === this.getCompareValue(item2);
    };
  
    toggleSelectAll(checked: boolean) {
      if (checked) {
        // Add only unique filtered options to selectedItems without duplicates
        const selectedFilteredItems = [
          ...this.selectedItems,
          ...this.filteredOptions.filter(
            (filteredItem) =>
              !this.selectedItems.some(
                (selectedItem) => this.getCompareValue(selectedItem) === this.getCompareValue(filteredItem),
              ),
          ),
        ];
        this.selectedItems = Array.from(new Set(selectedFilteredItems.map((item) => JSON.stringify(item)))).map((item) =>
          JSON.parse(item),
        );
      } else {
        // Remove only items currently in filteredOptions from selectedItems
        this.selectedItems = this.selectedItems.filter(
          (item) =>
            !this.filteredOptions.some(
              (filteredItem) => this.getCompareValue(filteredItem) === this.getCompareValue(item),
            ),
        );
      }
      this.emitSelection();
    }
  
    onSelectionChange(event: any) {
      if (this.multiple) {
        // Convert any selected IDs to full objects using optionList
        const newSelection = event.map((item: any) =>
          typeof item === 'object' ? item : this.optionList.find((opt) => opt[this.bindValue] === item),
        );
  
        // Merge unique items, storing only full objects
        this.selectedItems = [
          ...this.selectedItems.filter(
            (selectedItem) =>
              !newSelection.some((newItem) => this.getCompareValue(newItem) === this.getCompareValue(selectedItem)),
          ),
          ...newSelection,
        ];
      } else {
        // For single select, store only the selected full object
        this.selectedItems =
          event && typeof event === 'object' ? event : this.optionList.find((opt) => opt[this.bindValue] === event);
        // Auto-close dropdown for single select mode
        this.resetSearch();
        this.ngSelect.close();
        // this.currentSearchTerm = '';
        // this.ngSelect.searchTerm = '';
      }
      this.emitSelection();
    }
  
    emitSelection() {
      this.selectionChange.emit(this.selectedItems);
    }
  
    isAllSelected(): boolean {
      return (
        this.multiple &&
        this.filteredOptions.length > 0 &&
        this.filteredOptions.every((option) =>
          this.selectedItems.some((selected) => this.getCompareValue(selected) === this.getCompareValue(option)),
        )
      );
    }
  
    isIndeterminate(): boolean {
      return this.multiple && this.selectedItems.length > 0 && !this.isAllSelected();
    }
  
    onOpen() {
      this.isOpen = true;
      this.resetSearch();
    }
  
    onClose() {
      this.isOpen = false;
      // Always reset search when dropdown closes
      this.resetSearch();
      // If in single select mode, ensure the input is cleared
      if (!this.multiple) {
        setTimeout(() => {
          this.resetSearch(); // Call again after a short delay to ensure it takes effect
        });
      }
    }
  
    onSearch(event: { term: string; items: any[] }) {
      this.currentSearchTerm = event.term;
      this.filterOptions(event.term);
      // Clear the selected label when there's a search term in single-select mode
      if (!this.multiple && this.currentSearchTerm) {
        this.selectedItems = null;
      }
    }
  
    private filterOptions(term: string) {
      const searchTerm = term.toLowerCase();
      if (!searchTerm) {
        this.filteredOptions = [...this.optionList];
        return;
      }
  
      this.filteredOptions = this.optionList.filter((item) => {
        const labelMatch = item[this.bindLabel]?.toLowerCase().includes(searchTerm);
        const groupMatch = this.groupBy && item[this.groupBy]?.toLowerCase().includes(searchTerm);
        return labelMatch || groupMatch;
      });
    }
  
    searchFn = (term: string, item: any): boolean => {
      if (!term) return true;
      const searchTerm = term.toLowerCase();
      const labelMatch = item[this.bindLabel]?.toLowerCase().includes(searchTerm);
      const groupMatch = this.groupBy && item[this.groupBy]?.toLowerCase().includes(searchTerm);
      return labelMatch || groupMatch;
    };
  
    private resetSearch() {
      this.currentSearchTerm = '';
      this.filteredOptions = [...this.optionList];
      if (this.ngSelect) {
        this.ngSelect.searchTerm = '';
        // Force clear the input element
        const input = this.ngSelect.searchInput?.nativeElement;
        if (input) {
          input.value = '';
        }
      }
    }
}

import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ElementRef,
  HostListener,
  Optional,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import moment from 'moment';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ConfigService} from '../../services/config.service';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('search', { static: false }) search: any;
  @ViewChild('inputField') inputField: ElementRef;

  @Input() disableSearch = false;
  @Input() rowOrginalData: any = [];
  @Input() rowDataForColumn: any = [];
  @Input() advancedColumns: any = [];
  @Input() columns: any = [];
  @Input() class2append = '';
  @Input() resetField : any = false;
  @Input() emitSearchValue = false;
  @Input() searchModel = '';
  @Input() searchByColumn = false;
  @Input() isClearShow = false;
  @Input() wrapperClasses = '';
  @Input() serverSideSearch = false;
  @Input() showMic = false;
  @Input() searchPlaceholder = 'Listening...';
  @Input() defaultSearchPlaceholder = 'Search';
  @Input() changePlaceHolder = false;
  @Input() fullData = false;
  @Input() atapClassName = '';
  @Input() singleFieldSearch = false;
  @Output() applyFilter = new EventEmitter<any>();
  @Output() searchedValue = new EventEmitter<any>();
  @Output() clearApplyFilter = new EventEmitter<boolean>();
  @Output() applySearchFilter = new EventEmitter<any>();
  @Output() serverSearchObj = new EventEmitter<any>();
  showDropdown = false;
  columnSearch = false;
  isSearchBtnClicked = false;
  columnSearchFilters = [];
  activeClass = 'advance-search z-index-99 position-relative';
  recognition: any;
  isListening: boolean = false;
  isUserSpeaking: boolean = false;
  searchObject = {};
  objEmitted = false;
  enableMic = false;
  tempSearchModel = '';
  fieldName = '';

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    const isClickedOutside =
      !(event.target as HTMLElement).closest('.as-dropdown-panel') &&
      !(event.target as HTMLElement).closest('.as-input') &&
      !(event.target as HTMLElement).closest('.as-input-btn') &&
      !(event.target as HTMLElement).closest('.mat-calendar') &&
      !(event.target as HTMLElement).closest('.mask-icon-clear-icon');
    if (isClickedOutside && this.showDropdown) {
      this.showDropdown = false;
    }
  }

  @HostListener('window:beforeunload', ['$event']) handleBeforeUnload(event: Event): void {
    this.removeLocalStorage();
  }

  filterObj: any = [];

  constructor(
    public vserivce: VoiceRecognitionService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private configService: ConfigService,
  ) {
    this.vserivce.init();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.removeLocalStorage();
      }
    });
  }
  startRecording() {
    let silenceTimeout;

    this.changePlaceHolder = true;
    this.isUserSpeaking = true;
    this.vserivce.start();
    console.log('Speech recognition started');

    this.vserivce.recognition.addEventListener('result', (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log(transcript);
      this.searchModel = transcript;
      clearTimeout(silenceTimeout);
      silenceTimeout = setTimeout(() => {
        this.stopRecording();
      }, 3000);
    });
  }

  stopRecording() {
    this.changePlaceHolder = false;
    this.vserivce.stop();
    this.isUserSpeaking = false;
    if (this.isClearShow) {
      this.onSearchBtnClicked();
    } else {
      this.updateFilter(this.searchModel);
    }
  }

  ngOnInit(): void {
    if (this.configService?.config?.showPinkVerify?.speech_to_text && this.showMic) {
      this.enableMic = true;
    }
    // if (this.searchByColumn && this.advancedColumns?.length) {
    //   if (this.serverSideSearch) {
    //     this.columnSearch = true;
    //   }
    //   this.filterObj = this.advancedColumns?.map((item) => {
    //     return {
    //       value: '',
    //       type: item?.type ?? 'text',
    //       name: item?.name,
    //       prop: item?.prop,
    //       filter: item?.filter ?? 'yes',
    //       placeholder: item?.placeholder ?? '',
    //     };
    //   });
    // }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    // this.searchModel = '';
    try {
      if (changes?.resetField?.currentValue || changes?.rowOrginalData || this.resetField) {
        this.clearFiltervalues(false);
        this.searchModel = '';
        this.objEmitted = this.localStorageService.getItem('objEmitted');
        if (this.serverSideSearch) {
          this.columnSearch = true;
          if (this.objEmitted) {
            this.searchModel = this.localStorageService.getItem('searchModel');
            this.filterObj = this.localStorageService.getItem('filterObj');
          }
        }
        if (this.filterObj?.length && !this.serverSideSearch && !this.objEmitted) {
          for (const field of this.filterObj) {
            field.value = '';
          }
        }
      }

      if (this.searchByColumn && changes?.advancedColumns?.currentValue?.length) {
        if (this.serverSideSearch) {
          this.columnSearch = true;
        }
        this.filterObj = this.advancedColumns?.map((item) => {
          return {
            value: '',
            type: item?.type ?? 'text',
            name: item?.name,
            prop: item?.prop,
            filter: item?.filter ?? 'yes',
            placeholder: item?.placeholder ?? '',
          };
        });
      }
    } catch (error) {
      console.log(error, 'tops-ui-ngx-dt-search');
    }

    // For prefilled search value to trigger applyFilter handler
    if (changes?.searchModel && changes?.searchModel?.currentValue) {
      this.searchModel = changes?.searchModel?.currentValue;
      this.onSearchBtnClicked();
    }

    //when we don't want to clear search model on every input change
    // if (this.localStorageService.getItem('searchModel')){
    //   this.searchModel = this.localStorageService.getItem('searchModel');
    // }
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        map((x: any) => x['target']['value']),
      )
      .subscribe((value) => {
        if (!this.emitSearchValue) {
          this.updateFilter(value);
        } else {
          this.localStorageService.setItem('searchModel', this.searchModel);
          this.searchedValue.emit(value);
        }
      });
  }

  updateFilter(val: any) {
    const value = val?.toString()?.toLowerCase()?.trim();
    // get the amount of columns in the table
    // const count = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.rowOrginalData?.[0] || {});

    const keysToFilter = this.columns?.length ? this.columns : keys;

    // assign filtered matches to the active datatable
    const filterdRow = this.rowOrginalData?.filter((item: { [key: string]: any }) => {
      // Assume keysToFilter is an array of strings
      for (let i = 0; i < keysToFilter.length; i++) {
        const key = keysToFilter[i];
        // Check if item[key] exists and matches the filter value
        if (
          (item?.[key]?.toString()?.toLowerCase()?.indexOf(value) !== -1) ||
          !value
        ) {
          // Found a match
          return true;
        }
      }
      // No matches found for this item
      return false;
    });
    

    this.emitRows(value, filterdRow);

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  emitRows(searchedValue: string, rowData: any) {
    this.applyFilter.emit(this.fullData ? { rowData, searchedValue } : rowData);
  }

  toggleDropdown() {
    if (this.columnSearch) {
      this.showDropdown = !this.showDropdown;
      if (this.searchModel === '') {
        setTimeout(() => {
          this.setFocusOnInput();
        }, 0);
      }
    }
  }

  toggleSearchView() {
    if (!this.serverSideSearch) {
      if (this.searchModel !== '') {
        if (this.columnSearch) {
          this.showDropdown = !this.showDropdown;
        }
        return;
      }
      this.columnSearch = !this.columnSearch;
      this.searchModel = '';
      for (const field of this.filterObj) {
        field.value = '';
      }
      this.columnSearchFilters = [];
      if (!this.columnSearch) {
        this.showDropdown = false;
      } else {
        this.showDropdown = true;
        setTimeout(() => {
          this.setFocusOnInput();
        }, 0);
      }
    }
  }

  removeLocalStorage() {
    this.localStorageService.removeItem('objEmitted');
    this.localStorageService.removeItem('searchModel');
    this.localStorageService.removeItem('filterObj');
  }

  applySearchByColumns() {
    this.searchModel = '';
    this.showDropdown = false;
    this.objEmitted = false;
    this.removeLocalStorage();
    this.getFilterables();
    if (this.serverSideSearch) {
      this.searchObject = {};
      if (this.singleFieldSearch) {
        this.searchObject[this.fieldName] = this.tempSearchModel;
      } else {
        for (let item of this.columnSearchFilters) {
          this.searchObject[item?.key] = item.value;
        }
      }
      this.serverSearchObj.emit(this.searchObject);
      for (let item of this.columnSearchFilters) {
        if (item?.type === 'date') {
          item.value = moment(item.value).format('DD-MM-YYYY');
        }
        this.searchModel = this.searchModel + '  ' + item?.key2 + ':' + '(' + item?.value + ')';
        this.localStorageService.setItem('searchModel', this.searchModel);
        this.localStorageService.setItem('objEmitted', true);
      }
    } else {
      if (this.columnSearchFilters?.length !== 0) {
        const result = this.rowDataForColumn?.filter((item) => {
          return Object.keys(this.columnSearchFilters).every((key) => {
            if (this.columnSearchFilters[key]?.type === 'date') {
              const _date1 = moment(this.dateConversion(item[this.columnSearchFilters[key].key])).format('DD-MM-YYYY');
              const _date2 = moment(this.columnSearchFilters[key]?.value).format('DD-MM-YYYY');
              return _date1 === _date2;
            } else {
              return item[this.columnSearchFilters[key]?.key]
                ?.toString()
                .toLowerCase()
                .includes(this.columnSearchFilters[key]?.value?.toString().toLowerCase());
            }
          });
        });
        this.applyFilter.emit(result);
        for (let item of this.columnSearchFilters) {
          if (item?.type === 'date') {
            item.value = moment(item.value).format('DD-MM-YYYY');
          }
          this.searchModel = this.searchModel + '  ' + item?.key2 + ':' + '(' + item?.value + ')';
        }
      } else {
        this.applyFilter.emit(this.rowDataForColumn);
      }
    }
  }

  dateConversion(date) {
    const dateParts = date?.split(/[\s-:]/); // Split the date string into parts
    const year = parseInt(dateParts[2], 10); // Parse the year as an integer
    const month = parseInt(dateParts[1], 10) - 1; // Parse the month as an integer (subtract 1 since months are zero-based)
    const day = parseInt(dateParts[0], 10); // Parse the day as an integer
    const temp = new Date(year, month, day, 0, 0, 0); // Create a new Date object
    return temp;
  }

  getFilterables() {
    this.columnSearchFilters = [];
    this.localStorageService.setItem('filterObj', this.filterObj);
    this.filterObj?.forEach((item) => {
      if (item.value !== '' && item.value !== null) {
        this.columnSearchFilters.push({
          key: item.prop,
          key2: item.name,
          value: item.value,
          type: item.type,
          placeholder: item.placeholder,
        });
      }
    });
  }

  clearFiltervalues(emit = true) {
    this.showDropdown = false;
    for (const field of this.filterObj) {
      field.value = '';
    }
    this.searchModel = '';
    this.columnSearchFilters = [];
    this.localStorageService.removeItem('searchModel');
    this.localStorageService.removeItem('objEmitted');
    if (emit) {
      this.clearApplyFilter.emit(true);
    }
    if (this.serverSearchObj) {
      this.searchObject = {};
      if (emit) {
        this.serverSearchObj.emit(this.searchObject);
      }
    }
  }

  clearFilterFieldvalues(selectedField) {
    this.tempSearchModel = '';
    for (const field of this.filterObj) {
      if (this.singleFieldSearch && field?.name === selectedField?.name) {
        this.tempSearchModel = selectedField?.value;
        this.fieldName = selectedField?.prop;
        continue;
      }
      field.value = '';
    }
    this.columnSearchFilters = [];
    this.localStorageService.setItem('objEmitted', false);
    this.searchObject = {};
  }

  setFocusOnInput() {
    this.inputField.nativeElement.focus();
  }

  onSearchBtnClicked() {
    this.applySearchFilter.emit(this.searchModel);
    this.isSearchBtnClicked = true;
  }

  onClearBtnClicked() {
    this.isSearchBtnClicked = false;
    this.clearApplyFilter.emit(true);
    this.searchModel = '';
  }

  keyPresHandler() {
    this.isSearchBtnClicked = this.searchModel == '' ? false : this.isSearchBtnClicked;
  }
}


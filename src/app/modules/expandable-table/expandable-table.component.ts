import { Component, OnInit, ViewChild } from '@angular/core';
import { FormatColumnService } from '../../services/format-column.service';
import { NgxDatatableService } from '../../services/ngx-datatable.service';

@Component({
  selector: 'app-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrl: './expandable-table.component.scss',
})
export class ExpandableTableComponent implements OnInit {
  @ViewChild('myTable2') table: any;
  private currentUrlPath: string;
  private debounceTimer;
  private commonServiceAPICall: any = {};
  private detailApi = 'dev-app/v1.0/tableDetails';
  actionList = [];
  showAssetTable = false;
  rowData: any = [];
  rowDataCopy: any = [];
  hierarchyid: any = [];
  columnDefs: any = [];
  columnDefs2search: any = [];
  reCompile = false;
  loader = false;
  isDisable = true;
  disableRefresh = true;
  serverSidePaging: {
    // The number of elements in the page
    size: number;
    // The total number of elements
    totalElements: number;
    // The total number of pages
    totalPages: number;
    // The current page number
    pageNumber: number;
    // counter to show loading from server
    isLoading: number;
    // so we don't load same data twice
    cache: {};
  };

  searchValue: string;
  tableTotalCount: number;
  noData: boolean;
  disableSearch: boolean;
  menuFeatures: any;
  menuDetails: any = {};
  childrowData: any = [];
  showChildtable: boolean;
  ngxService: any;
  auto: any;
  constructor(
    public ngxDTService: NgxDatatableService,
    private formatColumnService: FormatColumnService
  ) {
    this.ngxService = this.ngxDTService;
    this.auto = this.ngxDTService?.config;
  }

  ngOnInit(): void {
    this.getDetailsForTable();
  }

  applySearch($event) {
    console.log($event);
    this.rowData = $event?.rowData;
    this.serverSidePaging.totalElements = $event?.searchedValue
      ? this.rowData?.length
      : this.tableTotalCount;
    this.checkDisable(true);
  }

  checkDisable(searchValue = false) {
    if (this.rowData?.length) {
      this.noData = false;
      this.disableSearch = false;
      this.isDisable = false;
    } else {
      if (!searchValue) this.disableSearch = true;
      this.noData = true;
      this.isDisable = true;
    }
    this.reCompile = !this.reCompile;
  }

  getDetailsForTable() {
    console.log('getDetailsForTable');
    this.setServerSideLogic();
    this.rowDataCopy = [];
    this.rowData = [];
    this.showAssetTable = false;
    this.isDisable = true;
    this.disableRefresh = true;
    this.reCompile = !this.reCompile;
    this.getServerSidePaginationData(0, true);
  }

  setServerSideLogic() {
    this.serverSidePaging = {
      // The number of elements in the page
      size: 150,
      // The total number of elements
      totalElements: 0,
      // The total number of pages
      totalPages: 0,
      // The current page number
      pageNumber: 0,
      // counter to show loading from server
      isLoading: 0,
      // so we don't load same data twice
      cache: {},
    };
  }

  setPage(pageInfo: any) {
    console.log(pageInfo, 'setPage');
    // Current page number is determined by last call to setPage
    // This is the page the UI is currently displaying
    // The current page is based on the UI pagesize and scroll position
    // Pagesize can change depending on browser size
    this.serverSidePaging.pageNumber = pageInfo?.offset;

    // Calculate row offset in the UI using pageInfo
    // This is the scroll position in rows
    const rowOffset = pageInfo.offset * pageInfo.pageSize;

    // When calling the server, we keep page size fixed
    // This should be the max UI pagesize or larger
    // This is not necessary but helps simplify caching since the UI page size can change
    // const page = new Page();
    // page.size = 20;
    const cachePageNumber = Math.floor(rowOffset / this.serverSidePaging.size);

    console.log(
      cachePageNumber,
      'cachePageNumber',
      rowOffset,
      this.serverSidePaging
    );
    // We keep a index of server loaded pages so we don't load same data twice
    // This is based on the server page not the UI
    if (this.serverSidePaging?.cache[cachePageNumber]) return;

    /**
     * check if rowData is empty then bypass debounce timer
     * Debounce timer is implemented to call API at end of scroll event, optimized API call
     */
    if (this.rowDataCopy?.length) {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.getServerSidePaginationData(cachePageNumber);
      }, 555);
    } else {
      console.log('instant call');
      this.getServerSidePaginationData(cachePageNumber);
    }
  }

  getServerSidePaginationData(cachePageNumber: number, initial = false) {
    this.showAssetTable = false;
    this.disableSearch = true;
    this.hierarchyid = [];
    console.log(this.hierarchyid);
    this.serverSidePaging.cache[cachePageNumber] = true;
    const pageEndRow = (cachePageNumber + 1) * this.serverSidePaging.size;
    const tempReq = {
      startRow: cachePageNumber * this.serverSidePaging.size + 1,
      endRow:
        this.serverSidePaging.totalElements <= pageEndRow
          ? this.serverSidePaging.totalElements
          : pageEndRow, // fix to handle API garbage data
      size: this.serverSidePaging?.size,
      // hierarchyIds: this.hierarchyid,
    };
    console.log(this.serverSidePaging, tempReq);
    this.serverSidePaging.isLoading++;
    this.commonServiceAPICall?.tableDataAPI?.unsubscribe();
    // this.commonServiceAPICall.tableDataAPI = this.commonService.postAPI(this.detailApi, tempReq).subscribe(
    //   (resp: any) => {
    //     console.log(resp, 'fetchLatestTable');
    const resp = {
      totalCount: 14,
      dataList: [
        {
          name: 'Bhaskar',
          age: 27,
          city: 'New York',
          jobTitle: 'Software Engineer',
          company: 'TechCorp',
          jdate: '28-06-1997',
        },
        {
          name: 'Anita',
          age: 29,
          city: 'San Francisco',
          jobTitle: 'Product Manager',
          company: 'Innovatech',
          jdate: '21-05-2007',
        },
        {
          name: 'John',
          age: 32,
          city: 'Los Angeles',
          jobTitle: 'Designer',
          company: 'Creatives',
          jdate: '18-08-2007',
        },
        {
          name: 'Sara',
          age: 25,
          city: 'Chicago',
          jobTitle: 'Data Analyst',
          company: 'DataMinds',
          jdate: '08-01-1999',
        },
        {
          name: 'David',
          age: 28,
          city: 'Seattle',
          jobTitle: 'Developer',
          company: 'CodeBase',
          jdate: '12-06-1997',
        },
        {
          name: 'Emily',
          age: 31,
          city: 'Boston',
          jobTitle: 'Marketing Specialist',
          company: 'MarketPro',
          jdate: '28-06-1998',
        },
        {
          name: 'Michael',
          age: 30,
          city: 'Austin',
          jobTitle: 'Sales Executive',
          company: 'SalesForce',
          jdate: '28-06-2007',
        },
        {
          name: 'Sophia',
          age: 26,
          city: 'Denver',
          jobTitle: 'HR Manager',
          company: 'HRExperts',
          jdate: '28-06-1997',
        },
        {
          name: 'Daniel',
          age: 33,
          city: 'Miami',
          jobTitle: 'Business Analyst',
          company: 'BizInsight',
          jdate: '28-06-2097',
        },
        {
          name: 'Olivia',
          age: 24,
          city: 'Las Vegas',
          jobTitle: 'Content Writer',
          company: 'WriteNow',
          jdate: '28-06-1997',
        },
        {
          name: 'Michael',
          age: 30,
          city: 'Austin',
          jobTitle: 'Sales Executive',
          company: 'SalesForce',
          jdate: '28-06-1997',
        },
        {
          name: 'Sophia',
          age: 26,
          city: 'Denver',
          jobTitle: 'HR Manager',
          company: 'HRExperts',
          jdate: '28-06-1997',
        },
        {
          name: 'Daniel',
          age: 33,
          city: 'Miami',
          jobTitle: 'Business Analyst',
          company: 'BizInsight',
          jdate: '28-06-1997',
        },
        {
          name: 'Olivia',
          age: 24,
          city: 'Las Vegas',
          jobTitle: 'Content Writer',
          company: 'WriteNow',
          jdate: '28-06-1997',
        },
      ],
      columnDefs: [
        { name: 'Name', prop: 'name' },
        { name: 'City', prop: 'city' },
        { name: 'Job Title', prop: 'jobTitle' },
        { name: 'Company', prop: 'company' },
        { name: 'Joining Date', prop: 'jdate', type: 'datetime' },
        { name: 'Age', prop: 'age', type: 'number' },
      ],
    };

    if (initial) {
      this.serverSidePaging.totalElements = resp?.totalCount || 0;
      this.tableTotalCount = this.serverSidePaging?.totalElements;
      if (this.serverSidePaging.totalElements) {
        this.noData = false;
        this.disableSearch = false;
      }
    }

    if (!this.rowData?.length) {
      this.rowData = resp?.dataList;
    } else {
      let j = 0;
      for (let i = tempReq?.startRow - 1; i < tempReq?.endRow; i++) {
        this.rowData[i] = resp?.dataList?.[j];
        j++;
      }
    }
    if (resp?.columnDefs?.length) {
      this.columnDefs = this.formatColumnService.formatColumnDef(
        resp?.columnDefs
      );
      this.columnDefs2search = resp?.columnDefs?.map((col) => col?.prop) ?? [];
    }

    this.rowData = [...this.rowData];
    this.rowDataCopy = [...this.rowData];

    this.disableRefresh = false;
    this.loader = false;
    this.checkDisable();
    this.serverSidePaging.isLoading--;

    this.showAssetTable = true;
    // },
    // (err) => {
    //   this.showAssetTable = true;
    //   this.serverSidePaging.totalElements = 0;
    //   this.serverSidePaging.cache[cachePageNumber] = false;
    //   this.serverSidePaging.isLoading--;
    // },
    // );
  }

  getDRDetails(rowData) {
    this.childrowData = [];
    this.showChildtable = false;
    const data2send = {
      drAssets: rowData?.drAssets,
    };
    console.log(data2send);
    // this.commonService.postAPI('draas-mgmt-svc/configuration/v1.0/getDRDetails', data2send).subscribe(
    //   (resp: any) => {
    const resp = {
      dataList: [
        {
          name: 'Himanshu',
          age: 27,
          city: 'New York',
          jobTitle: 'Software Engineer',
          company: 'TechCorp',
          jdate: '28-06-1997',
        },
        {
          name: 'Diwakar',
          age: 29,
          city: 'San Francisco',
          jobTitle: 'Product Manager',
          company: 'Innovatech',
          jdate: '21-05-2007',
        },
      ],
    };
    this.childrowData = resp?.dataList;
    this.showChildtable = true;
    console.log(this.childrowData);
    //   },
    //   (err) => {
    //     this.showChildtable = true;
    //   },
    // );
  }
  expandRow(row) {
    this.table.rowDetail.collapseAllRows();
    this.table.rowDetail.toggleExpandRow(row);
    this.getDRDetails(row);
  }
  collapseRow() {
    this.table.rowDetail.collapseAllRows();
  }
  onDetailToggle(event) {
    console.log('detail', event);
  }
  mappedAssets() {
    this.getDetailsForTable();
  }
}

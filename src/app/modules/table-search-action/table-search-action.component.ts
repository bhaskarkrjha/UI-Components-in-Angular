import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-search-action',
  templateUrl: './table-search-action.component.html',
  styleUrl: './table-search-action.component.scss'
})
export class TableSearchActionComponent implements OnInit{
  rowDataCopy : any = [];
  columnDefs2search : any;
  disableSearch : boolean;
  rowData : any = [
    { name: 'Bhaskar', age: 27, city: 'New York', jobTitle: 'Software Engineer', company: 'TechCorp' },
    { name: 'Anita', age: 29, city: 'San Francisco', jobTitle: 'Product Manager', company: 'Innovatech' },
    { name: 'John', age: 32, city: 'Los Angeles', jobTitle: 'Designer', company: 'Creatives' },
    { name: 'Sara', age: 25, city: 'Chicago', jobTitle: 'Data Analyst', company: 'DataMinds' },
    { name: 'David', age: 28, city: 'Seattle', jobTitle: 'Developer', company: 'CodeBase' },
    { name: 'Emily', age: 31, city: 'Boston', jobTitle: 'Marketing Specialist', company: 'MarketPro' },
    { name: 'Michael', age: 30, city: 'Austin', jobTitle: 'Sales Executive', company: 'SalesForce' },
    { name: 'Sophia', age: 26, city: 'Denver', jobTitle: 'HR Manager', company: 'HRExperts' },
    { name: 'Daniel', age: 33, city: 'Miami', jobTitle: 'Business Analyst', company: 'BizInsight' },
    { name: 'Olivia', age: 24, city: 'Las Vegas', jobTitle: 'Content Writer', company: 'WriteNow' },
    { name: 'Michael', age: 30, city: 'Austin', jobTitle: 'Sales Executive', company: 'SalesForce' },
    { name: 'Sophia', age: 26, city: 'Denver', jobTitle: 'HR Manager', company: 'HRExperts' },
    { name: 'Daniel', age: 33, city: 'Miami', jobTitle: 'Business Analyst', company: 'BizInsight' },
    { name: 'Olivia', age: 24, city: 'Las Vegas', jobTitle: 'Content Writer', company: 'WriteNow' }
  ];
  constructor() {
    
  }
  ngOnInit(){
    this.rowDataCopy = [...this.rowData];
  }
  applySearch(e){
    console.log(e);
  }

}

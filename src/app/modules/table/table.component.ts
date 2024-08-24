import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  columnDefs :any = [
    { name: 'Name', prop: 'name' },
    { name: 'Age', prop: 'age' },
    { name: 'City', prop: 'city' },
    { name: 'Job Title', prop: 'jobTitle' },
    { name: 'Company', prop: 'company' }
  ];

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

}

import { Component, OnInit } from '@angular/core';
import { NgxDatatableService } from '../../services/ngx-datatable.service';
import { FormatColumnService } from '../../services/format-column.service';
@Component({
  selector: 'app-ngx-table',
  templateUrl: './ngx-table.component.html',
  styleUrl: './ngx-table.component.scss',
})
export class NgxTableComponent implements OnInit {
  columnDefs: any = [
    { name: 'Name', prop: 'name' },
    { name: 'City', prop: 'city' },
    { name: 'Job Title', prop: 'jobTitle' },
    { name: 'Company', prop: 'company' },
    { name: 'Joining Date', prop: 'jdate', type: 'datetime' },
    { name: 'Age', prop: 'age', type: 'number' },
  ];

  rowData: any = [
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
  ];
  ngxService: any;
  constructor(
    private ngxDTService: NgxDatatableService,
    private formatColumnService: FormatColumnService
  ) {
    this.ngxService = this.ngxDTService;
  }
  ngOnInit(): void {
    this.columnDefs = this.formatColumnService.formatColumnDef(this.columnDefs);
  }
}

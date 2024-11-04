import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrl: './query-builder.component.scss'
})
export class QueryBuilderComponent implements OnInit {
  query : any;
  resetForm : boolean;
  jsonData : any;
  ruleExpression : string;
  constructor(){}
  ngOnInit(): void {
    console.log('x');
  }
  handleJsonData(jsonData : any){
    console.log(jsonData,'json');
    this.resetForm = false;
    this.jsonData = jsonData;
  }
  showQuery(){
    this.ruleExpression = this.buildExpression(this.jsonData?.value);
    console.log(this.ruleExpression);
  }
  buildExpression(json: any): string {
    const { condition, rules, operator, name, value } = json;
  
    // Handle conditions and rules
    if (condition && rules) {
      const expression = rules
        .map((rule: any) => this.buildExpression(rule))
        .join(` ${condition.toLowerCase()} `);
      return `(${expression})`;
    } 
    
    // Handle operators for leaf nodes
    let operatorExpression = '';
    switch (operator) {
      case '=':
        operatorExpression = `${name} = '${value}'`;
        break;
      case '!=':
        operatorExpression = `${name} != '${value}'`;
        break;
      case 'like1':
        operatorExpression = `${name} LIKE '${value}%'`;
        break;
      case 'like2':
        operatorExpression = `${name} LIKE '%${value}%'`;
        break;
      default:
        operatorExpression = `${name} = '${value}'`;
    }
  
    return operatorExpression;
  }
  reset(){
    this.resetForm = true;
  }
  
}

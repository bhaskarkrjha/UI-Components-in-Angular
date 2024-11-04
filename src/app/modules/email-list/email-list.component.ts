import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrl: './email-list.component.scss'
})
export class EmailListComponent implements OnInit {
  sendEmail: FormGroup;
  public emailList: any[] = [];
  public emailpass: any[] = [];
  sendDisabled = true;
  @ViewChild('chipList') chipList;
  emailNotValidTO: boolean;
  separatorKeysCodes = [ENTER, COMMA, SPACE];
  showEmail: boolean = false;
  constructor(
    private formBuilder : FormBuilder
  ){}
  ngOnInit(): void {
    this.sendEmail = this.formBuilder.group({
      email: [null, [Validators.required]],
    });   
  }
  private validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  add(event): void {
    if (event.value) {
      if (this.validateEmail(event.value) && this.emailpass.indexOf(event.value) === -1) {
        this.emailList.push({ value: event.value, invalid: false });
        this.emailpass.push(event.value);
        this.chipList.errorState = false;
        this.emailNotValidTO = false;
      } else {
        this.emailList.push({ value: event.value, invalid: true });
      }
    }
    if (event.input) {
      event.input.value = '';
    }
    this.sendEnable();
  }


paste(event: ClipboardEvent): void {
    event.preventDefault();
    event.clipboardData
      .getData('Text')
      .split(/;|,|\n|\r/)
      .forEach((value) => {
        if (this.validateEmail(value) && this.emailpass.indexOf(value) === -1) {
          this.emailList.push({ value: value, invalid: false });
          this.emailpass.push(value);
        }
      });
    this.sendEnable();
  }

removeEmail(data: any): void {
    if (this.emailList?.indexOf(data) >= 0) {
      this.emailList?.splice(this.emailList?.indexOf(data), 1);
      if (!data.invalid) {
        this.emailpass?.splice(this.emailpass?.indexOf(data?.value), 1);
      }
    }
    this.sendEnable();
  }

  sendEnable() {
    this.sendDisabled = this.emailList.filter((email) => email.invalid).length > 0;
    if (this.sendDisabled) {
      this.chipList.errorState = true;
      this.emailNotValidTO = true;
    } else {
      this.chipList.errorState = false;
      this.emailNotValidTO = false;
    }
  }
  viewList(){
    this.showEmail = true;
    console.log(this.emailList);
    
  }



}

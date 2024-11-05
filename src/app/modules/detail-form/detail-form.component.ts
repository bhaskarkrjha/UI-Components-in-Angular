import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray,FormControl } from '@angular/forms';
import { ValidationPatternService } from '../../services/validation-pattern.service';
@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrl: './detail-form.component.scss'
})
export class DetailFormComponent implements OnInit {
  mainForm : FormGroup
  infoMsg : string = 'Ip Range'
  formData : any = {};
  viewFromData : boolean = false;
  constructor(
    private formBuilder : FormBuilder,
    public validationPattern : ValidationPatternService
  ){}
  ngOnInit(): void {
    this.mainForm = this.formBuilder.group({
      subnet : [null, [Validators.required]],
      gateway : [null, [Validators.required]],
      dns : [null,[Validators.required]],
      ipRange : [null,[Validators.required]],
      fromPort : [null,[Validators.required]],
      toPort : [null,[Validators.required]]
    })
  }
  onIpChange(){
    if(this.mainForm.get('ipRange').value){
      this.mainForm.get('fromPort').disable();
      this.mainForm.get('toPort').disable();
    } else {
      this.mainForm.get('fromPort').enable();
      this.mainForm.get('toPort').enable();
    }
  }
  onPortChange(){
    if(this.mainForm.get('fromPort').value || this.mainForm.get('toPort').value){
      this.mainForm.get('ipRange').disable();
    } else {
      this.mainForm.get('ipRange').enable();
    }
  }
  get ipControls(){
    return this.mainForm.controls;
  }
  clearControl(control){
    control.setValue(null);
  }
  getIPList(){
    this.formData = this.mainForm.value;
    this.viewFromData = true;
    console.log(this.formData,'form');
    this.mainForm.reset();
    this.mainForm.get('ipRange').enable();
    this.mainForm.get('fromPort').enable();
    this.mainForm.get('toPort').enable();
  }

}

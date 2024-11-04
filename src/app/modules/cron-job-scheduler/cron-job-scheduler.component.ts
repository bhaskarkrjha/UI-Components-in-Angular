import { Component, OnInit, ViewChild } from '@angular/core';
import { CronScheduleComponent } from '../../shared/cron-schedule/cron-schedule.component';
@Component({
  selector: 'app-cron-job-scheduler',
  templateUrl: './cron-job-scheduler.component.html',
  styleUrl: './cron-job-scheduler.component.scss'
})
export class CronJobSchedulerComponent implements OnInit{
  @ViewChild(CronScheduleComponent) CronScheduleComponent!: CronScheduleComponent;
  formData : any = {
    repeatsSelected : null,
    send_at : null,
    startDate : null,
    endDate : null,
    repeats_on : null
  }
  submitDisabled : boolean = true;
  showJobData : boolean = false;
  constructor(){}
  ngOnInit(): void {
    console.log('x');
  }
  onFormValidityChange(isvalid : boolean){
    console.log(isvalid,'event1');
    this.submitDisabled=!isvalid;
  }
  onFormDataChange(data : any){
    console.log(data,'event 2');
    this.showJobData  = false;
    this.formData = data
  }
  reset(){
    this.formData = {
      repeatsSelected : null,
      send_at : null,
      startDate : null,
      endDate : null,
      repeats_on : null
    }
    this.submitDisabled = true;
    if(this.CronScheduleComponent){
      this.CronScheduleComponent.resetForm();
    }
    this.showJobData = false;

  }
  submit(){
    console.log(this.formData);
    this.showJobData = true;
  }

}

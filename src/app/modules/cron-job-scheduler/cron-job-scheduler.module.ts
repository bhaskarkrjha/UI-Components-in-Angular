import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CronJobSchedulerComponent } from './cron-job-scheduler.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: CronJobSchedulerComponent }];

@NgModule({
  declarations: [CronJobSchedulerComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CronJobSchedulerModule {}

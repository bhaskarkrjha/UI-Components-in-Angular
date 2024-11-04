import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CronJobSchedulerComponent } from './cron-job-scheduler.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ path: '', component: CronJobSchedulerComponent }];

@NgModule({
  declarations: [CronJobSchedulerComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],
})
export class CronJobSchedulerModule {}

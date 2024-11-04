import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core'; //
import { CronScheduleComponent } from './cron-schedule/cron-schedule.component';
import { CustomSwitchComponent } from './custom-switch/custom-switch.component';
@NgModule({
  declarations: [SearchComponent,DropdownComponent, CronScheduleComponent, CustomSwitchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    NgSelectModule,
    MatCheckboxModule,
    MatNativeDateModule
  ],
  exports: [SearchComponent,DropdownComponent,CronScheduleComponent, CustomSwitchComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableTableComponent } from './expandable-table.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxDatatableService } from '../../services/ngx-datatable.service';
const routes: Routes = [{ path: '', component: ExpandableTableComponent }];



@NgModule({
  declarations: [
    ExpandableTableComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes),SharedModule,NgxDatatableModule,MatTooltipModule],
  providers : [NgxDatatableService]
})
export class ExpandableTableModule { }

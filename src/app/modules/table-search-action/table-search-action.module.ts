import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSearchActionComponent } from './table-search-action.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxDatatableService } from '../../services/ngx-datatable.service';
const routes: Routes = [{ path: '', component: TableSearchActionComponent }];


@NgModule({
  declarations: [
    TableSearchActionComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes),SharedModule,NgxDatatableModule,MatTooltipModule],
  providers : [NgxDatatableService]
})
export class TableSearchActionModule { }

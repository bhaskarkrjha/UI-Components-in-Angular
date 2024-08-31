import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTableComponent } from './ngx-table.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxDatatableService } from '../../services/ngx-datatable.service';
const routes: Routes = [{ path: '', component: NgxTableComponent }];

@NgModule({
  declarations: [NgxTableComponent],
  imports: [CommonModule, RouterModule.forChild(routes),NgxDatatableModule,MatTooltipModule],
  providers : [NgxDatatableService]
})
export class NgxTableModule {}

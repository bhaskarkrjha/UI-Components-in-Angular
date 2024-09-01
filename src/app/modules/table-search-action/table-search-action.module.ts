import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSearchActionComponent } from './table-search-action.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
const routes: Routes = [{ path: '', component: TableSearchActionComponent }];


@NgModule({
  declarations: [
    TableSearchActionComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes),SharedModule],

})
export class TableSearchActionModule { }

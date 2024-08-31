import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSearchActionComponent } from './table-search-action.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: TableSearchActionComponent }];


@NgModule({
  declarations: [
    TableSearchActionComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],

})
export class TableSearchActionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableTableComponent } from './expandable-table.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: ExpandableTableComponent }];



@NgModule({
  declarations: [
    ExpandableTableComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],

})
export class ExpandableTableModule { }

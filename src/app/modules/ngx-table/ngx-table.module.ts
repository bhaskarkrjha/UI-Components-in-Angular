import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTableComponent } from './ngx-table.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: NgxTableComponent }];

@NgModule({
  declarations: [NgxTableComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class NgxTableModule {}

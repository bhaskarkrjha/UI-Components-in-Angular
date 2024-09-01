import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownFilterComponent } from './dropdown-filter.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: DropdownFilterComponent }];

@NgModule({
  declarations: [DropdownFilterComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DropdownFilterModule {}

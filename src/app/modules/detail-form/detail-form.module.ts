import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailFormComponent } from './detail-form.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: DetailFormComponent }];

@NgModule({
  declarations: [DetailFormComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DetailFormModule {}

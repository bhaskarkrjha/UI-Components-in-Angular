import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailListComponent } from './email-list.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: EmailListComponent }];

@NgModule({
  declarations: [EmailListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EmailListModule {}

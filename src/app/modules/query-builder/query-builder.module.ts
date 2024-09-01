import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryBuilderComponent } from './query-builder.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: QueryBuilderComponent }];

@NgModule({
  declarations: [QueryBuilderComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class QueryBuilderModule {}

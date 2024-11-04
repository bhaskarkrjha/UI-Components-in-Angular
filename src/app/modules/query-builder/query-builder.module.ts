import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryBuilderComponent } from './query-builder.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../shared/shared.module';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddConditionComponent } from './add-condition/add-condition.component';
const routes: Routes = [{ path: '', component: QueryBuilderComponent }];

@NgModule({
  declarations: [
    QueryBuilderComponent,
    AddGroupComponent,
    AddConditionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatMenuModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class QueryBuilderModule {}

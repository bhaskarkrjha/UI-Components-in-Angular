import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailForm2Component } from './detail-form-2.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
export const routes: Routes = [{ path: '', component: DetailForm2Component }];


@NgModule({
  declarations: [ DetailForm2Component ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltip,
    RouterModule.forChild(routes),
  ],
})
export class DetailForm2Module { }

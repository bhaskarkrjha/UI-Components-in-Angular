import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailFormComponent } from './detail-form.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

export const routes: Routes = [{ path: '', component: DetailFormComponent }];

@NgModule({
  declarations: [DetailFormComponent],
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
export class DetailFormModule {}

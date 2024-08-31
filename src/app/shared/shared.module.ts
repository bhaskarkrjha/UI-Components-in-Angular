import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { DropdownComponent } from './dropdown/dropdown.component';



@NgModule({
  declarations: [
    SearchComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

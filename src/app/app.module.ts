import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', component: AppComponent },
  {
    path: 'table',
    loadChildren: () =>
      import('./modules/table/table.module').then((m) => m.TableModule),
  },
  {
    path: 'ngx-table',
    loadChildren: () =>
      import('./modules/ngx-table/ngx-table.module').then(
        (m) => m.NgxTableModule
      ),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

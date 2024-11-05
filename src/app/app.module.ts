import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
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
  {
    path: 'ngx-table-search',
    loadChildren: () =>
      import('./modules/table-search-action/table-search-action.module').then(
        (m) => m.TableSearchActionModule
      ),
  },
  {
    path: 'expandable-table',
    loadChildren: () =>
      import('./modules/expandable-table/expandable-table.module').then(
        (m) => m.ExpandableTableModule
      ),
  },
  {
    path: 'dropdown-filter',
    loadChildren: () =>
      import('./modules/dropdown-filter/dropdown-filter.module').then(
        (m) => m.DropdownFilterModule
      ),
  },
  {
    path: 'email-list',
    loadChildren: () =>
      import('./modules/email-list/email-list.module').then(
        (m) => m.EmailListModule
      ),
  },
  {
    path: 'detail-forms',
    loadChildren: () =>
      import('./modules/detail-form/detail-form.module').then(
        (m) => m.DetailFormModule
      ),
  },
  {
    path: 'detail-forms-2',
    loadChildren: () =>
      import('./modules/detail-form-2/detail-form-2.module').then(
        (m) => m.DetailForm2Module
      ),
  },
  {
    path: 'cron-job',
    loadChildren: () =>
      import('./modules/cron-job-scheduler/cron-job-scheduler.module').then(
        (m) => m.CronJobSchedulerModule
      ),
  },
  {
    path: 'query-builder',
    loadChildren: () =>
      import('./modules/query-builder/query-builder.module').then(
        (m) => m.QueryBuilderModule
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/home' } // Wildcard route for a 404 page or fallback
];

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

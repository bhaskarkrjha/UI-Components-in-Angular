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
    path: 'ngx-table-search-action',
    loadChildren: () =>
      import('./modules/table-search-action/table-search-action.module').then(
        (m) => m.TableSearchActionModule
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

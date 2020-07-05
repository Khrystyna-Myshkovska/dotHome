import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ApartmentsComponent } from './pages/apartments/apartments.component';
import { ApartmentDetailsComponent } from './pages/apartment-details/apartment-details.component';
import { TermsComponent } from './pages/terms/terms.component';
import { RequestComponent } from './pages/request/request.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDistrictsComponent } from './admin/admin-districts/admin-districts.component';
import { AdminApartmentsComponent } from './admin/admin-apartments/admin-apartments.component';
import { AdminRequestsComponent } from './admin/admin-requests/admin-requests.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileGuard } from './shared/guards/profile.guard';



const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path : 'home', component: HomeComponent},
  {path : 'apartments', component: ApartmentsComponent},
  {path : 'apartments/:id', component: ApartmentDetailsComponent},
  {path : 'terms', component: TermsComponent},
  {path : 'request', component: RequestComponent},
  {path : 'admin', component: AdminComponent,canActivate: [AuthGuard],  children:[
    {path: '', pathMatch: 'full', redirectTo: 'apartments'},
    {path : 'districts', component: AdminDistrictsComponent},
    {path : 'apartments', component: AdminApartmentsComponent},
    {path : 'request', component: AdminRequestsComponent},
  ]},
  {path : 'profile', component: ProfileComponent, canActivate: [ProfileGuard]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

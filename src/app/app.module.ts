import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './ngxUiLoaderConfig'

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

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
import { OrderByPricePipe } from './shared/pipes/order-by-price.pipe';
import { HryvniaPipe } from './shared/pipes/hryvnia.pipe';
import { SafePipePipe } from './shared/pipes/safe-pipe.pipe';
import { SearchPipe } from './shared/pipes/search.pipe';
import { FilterRoomsPipe } from './shared/pipes/filter-rooms.pipe';
import { SortDistrictPipe } from './shared/pipes/sort-district.pipe';

import { NgxPaginationModule } from 'ngx-pagination';
import { ScaleDirective } from './shared/directives/scale.directive';


export const firebaseConfig = {
  apiKey: "AIzaSyCRGNFmiUN4V9ioxOB_gOcDth6UOXdpwG4",
  authDomain: "d0thome.firebaseapp.com",
  databaseURL: "https://d0thome.firebaseio.com",
  projectId: "d0thome",
  storageBucket: "d0thome.appspot.com",
  messagingSenderId: "989206057153",
  appId: "1:989206057153:web:f030de3f32848123de8440"
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ApartmentsComponent,
    ApartmentDetailsComponent,
    TermsComponent,
    RequestComponent,
    ProfileComponent,
    AdminComponent,
    AdminDistrictsComponent,
    AdminApartmentsComponent,
    AdminRequestsComponent,
    OrderByPricePipe,
    HryvniaPipe,
    SafePipePipe,
    SearchPipe,
    FilterRoomsPipe,
    SortDistrictPipe,
    ScaleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

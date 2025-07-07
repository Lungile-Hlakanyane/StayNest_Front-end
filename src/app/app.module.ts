import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateProfileComponent } from './pages/create-profile/create-profile/create-profile.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password/forgot-password.component';
import { OtpComponent } from './pages/otp/otp/otp.component';
import { NewPasswordComponent } from './pages/new-password/new-password/new-password.component';
import { TabsComponent } from './re-useable-components/tabs/tabs/tabs.component';
import { SideMenuComponent } from './re-useable-components/side-menu/side-menu/side-menu.component';
import { FavoritesComponent } from './pages/favorites/favorites/favorites.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password/change-password.component';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { BookingsComponent } from './pages/bookings/bookings/bookings.component';
import { AccomodationDetailsComponent } from './pages/accomodation-details/accomodation-details/accomodation-details.component';
import { BookComponent } from './pages/book/book/book.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, LoginComponent, CreateProfileComponent,
  ForgotPasswordComponent, OtpComponent, NewPasswordComponent, TabsComponent, SideMenuComponent, FavoritesComponent, 
  ProfileComponent, ChangePasswordComponent, SettingsComponent, BookingsComponent, AccomodationDetailsComponent, BookComponent],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

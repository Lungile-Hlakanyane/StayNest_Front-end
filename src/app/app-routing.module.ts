import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile/create-profile.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password/forgot-password.component';
import { OtpComponent } from './pages/otp/otp/otp.component';
import { NewPasswordComponent } from './pages/new-password/new-password/new-password.component';
import { TabsComponent } from './re-useable-components/tabs/tabs/tabs.component';
import { FavoritesComponent } from './pages/favorites/favorites/favorites.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password/change-password.component';
import { SettingsComponent } from './pages/settings/settings/settings.component';
import { BookingsComponent } from './pages/bookings/bookings/bookings.component';
import { AccomodationDetailsComponent } from './pages/accomodation-details/accomodation-details/accomodation-details.component';
import { BookComponent } from './pages/book/book/book.component';
import { MakePaymentComponent } from './re-useable-components/make-payment/make-payment/make-payment.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { NotificationsComponent } from './pages/notifications/notifications/notifications.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { MyPropertiesComponent } from './pages/my-properties/my-properties/my-properties.component';
import { AddPropertyComponent } from './pages/add-property/add-property/add-property.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create-profile', component: CreateProfileComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'settings', component:SettingsComponent},
  { path: 'accomodation-details', component:AccomodationDetailsComponent},
  { path: 'book', component: BookComponent},
  { path: 'make-payment', component:MakePaymentComponent},
  { path: 'chat', component: ChatComponent},
  { path: 'notifications', component:NotificationsComponent},
  { path: 'my-properties', component: MyPropertiesComponent},
  { path: 'add-property', component: AddPropertyComponent},
  {
    path: '',
    component: TabsComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
      { path: 'favorites', component: FavoritesComponent}, 
      { path: 'profile', component: ProfileComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'dashboard', component: DashboardComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

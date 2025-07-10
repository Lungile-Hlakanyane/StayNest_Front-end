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
import { EditAccomodationComponent } from './pages/edit-accomodation/edit-accomodation/edit-accomodation.component';
import { LandlordViewAccomodationComponent } from './pages/landlord-view-accomodation/landlord-view-accomodation/landlord-view-accomodation.component';
import { BookingRequestsComponent } from './pages/booking-request/booking-requests/booking-requests.component';
import { LandlordViewBookingComponent } from './pages/landlord-view-booking/landlord-view-booking/landlord-view-booking.component';
import { AnalyticsReportsComponent } from './pages/analytics-reports/analytics-reports/analytics-reports.component';
import { TenantListComponent } from './pages/tenant-list/tenant-list/tenant-list.component';
import { TenantProfileComponent } from './pages/tenant-profile/tenant-profile/tenant-profile.component';
import { MaintenanceComponent } from './pages/maintenannce/maintenance/maintenance.component';
import { BankDetailsComponent } from './pages/bank-details/bank-details/bank-details.component';
import { SavedCardsComponent } from './pages/saved-cards/saved-cards/saved-cards.component';
import { HelpFaqComponent } from './pages/help-faq/help-faq/help-faq.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions/terms-and-conditions.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users/manage-users.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ManagePropertiesComponent } from './pages/manage-propertiees/manage-properties/manage-properties.component';
import { AdminViewPropertyComponent } from './pages/admin-view-property/admin-view-property/admin-view-property.component';
import { AdminBookingOversightComponent } from './pages/manage-bookings/admin-booking-oversight/admin-booking-oversight.component';
import { AdminViewBookingComponent } from './pages/admin-view-booking/admin-view-booking/admin-view-booking.component';
import { AdminSupportTicketComponent } from './pages/admin-support-tickets/admin-support-ticket/admin-support-ticket.component';
import { AdminReportsAnalyticsComponent } from './pages/admin-reports-analytics/admin-reports-analytics/admin-reports-analytics.component';
import { AdminPaymentsTransactionsComponent } from './pages/admin-payments-transactions/admin-payments-transactions/admin-payments-transactions.component';
import { PushNotificationsComponent } from './pages/push-notifications/push-notifications/push-notifications.component';

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
  { path: 'edit-accomodation', component: EditAccomodationComponent},
  { path: 'landlord-view-accomodation', component: LandlordViewAccomodationComponent},
  { path: 'booking-request', component: BookingRequestsComponent},
  { path: 'landlord-view-booking', component: LandlordViewBookingComponent},
  { path: 'tenant-list', component: TenantListComponent},
  { path: 'tenant-profile', component: TenantProfileComponent},
  { path: 'maintenance', component: MaintenanceComponent},
  { path: 'bank-details', component: BankDetailsComponent},
  { path: 'saved-cards', component: SavedCardsComponent},
  { path: 'help-faq', component: HelpFaqComponent},
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  { path: 'manage-users', component: ManageUsersComponent},
  { path: 'view-user', component: ViewUserComponent},
  { path: 'manage-properties', component: ManagePropertiesComponent},
  { path: 'admin-view-property', component: AdminViewPropertyComponent},
  { path: 'admin-view-booking', component:AdminViewBookingComponent},
  { path: 'admin-support-ticket', component: AdminSupportTicketComponent},
  { path: 'admin-report-analytics', component: AdminReportsAnalyticsComponent},
  { path: 'admin-payments-transactions', component: AdminPaymentsTransactionsComponent},
  { path: 'push-announcements', component: PushNotificationsComponent},
  {
    path: '',
    component: TabsComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
      { path: 'favorites', component: FavoritesComponent}, 
      { path: 'profile', component: ProfileComponent },
      { path: 'analytics-reports', component:AnalyticsReportsComponent},
      { path: 'bookings', component: BookingsComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'admin-dashboard', component: AdminDashboardComponent},
      { path: 'admin-booking-oversight', component: AdminBookingOversightComponent},
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

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
import { SuccessBookingComponent } from './re-useable-components/success-booking/success-booking/success-booking.component';
import { MakePaymentComponent } from './re-useable-components/make-payment/make-payment/make-payment.component';
import { SuccessPaymentComponent } from './re-useable-components/success-payment/success-payment/success-payment.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { RateAccomodationModalComponent } from './re-useable-components/rate-accomodation-modal/rate-accomodation-modal/rate-accomodation-modal.component';
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
import { HttpClientModule } from '@angular/common/http';
import { AddCalenderComponent } from './pages/add-calender/add-calender/add-calender.component';
import { CalendarSlotsComponent } from './pages/calendar-slots/calendar-slots/calendar-slots.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, LoginComponent, CreateProfileComponent, HttpClientModule,
  ForgotPasswordComponent, OtpComponent, NewPasswordComponent, TabsComponent, SideMenuComponent, FavoritesComponent, 
  ProfileComponent, ChangePasswordComponent, SettingsComponent, BookingsComponent, AccomodationDetailsComponent, BookComponent,
  SuccessBookingComponent, MakePaymentComponent, SuccessPaymentComponent, ChatComponent, RateAccomodationModalComponent, 
  NotificationsComponent, DashboardComponent, MyPropertiesComponent,AddPropertyComponent, EditAccomodationComponent, 
  LandlordViewAccomodationComponent, BookingRequestsComponent, LandlordViewBookingComponent, AnalyticsReportsComponent,
  TenantListComponent, TenantProfileComponent, MaintenanceComponent, BankDetailsComponent, SavedCardsComponent, 
  HelpFaqComponent, TermsAndConditionsComponent, AdminDashboardComponent, ManageUsersComponent, ViewUserComponent, 
  ManagePropertiesComponent, AdminViewPropertyComponent, AdminBookingOversightComponent, AdminViewBookingComponent, 
  AdminSupportTicketComponent, AdminReportsAnalyticsComponent, AdminPaymentsTransactionsComponent, PushNotificationsComponent,
  AddCalenderComponent, CalendarSlotsComponent
],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

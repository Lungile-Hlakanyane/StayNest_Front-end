import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CalendarService } from 'src/app/servicess/calendar-service/calendar.service';

@Component({
  selector: 'app-admin-booking-oversight',
  templateUrl: './admin-booking-oversight.component.html',
  styleUrls: ['./admin-booking-oversight.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AdminBookingOversightComponent  implements OnInit {

  bookings: any[] = [];

  constructor(
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController,
    private router:Router,
    private calendarService: CalendarService
  ) {}

  goBack() {
    history.back();
  }

  async viewBooking(booking: any) {
    const toast = await this.toastCtrl.create({
      message: `Viewing booking for ${booking.tenantName}`,
      duration: 2000,
      color: 'primary',
      position: 'top'
    });
    await toast.present().then(()=>{
      this.router.navigateByUrl('/admin-view-booking');
    });
  }

  async approveBooking(booking: any) {
    const alert = await this.alertCtrl.create({
      header: 'Approve Booking',
      message: `Approve booking for ${booking.tenantName}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Yes', handler: async () => {
            booking.status = 'approved';
            const toast = await this.toastCtrl.create({
              message: 'Booking approved!',
              duration: 3000,
              color: 'success',
              position: 'top'
            });
            await toast.present();
          }
        }
      ]
    });
    await alert.present();
  }

  async rejectBooking(booking: any) {
    const alert = await this.alertCtrl.create({
      header: 'Reject Booking',
      message: `Reject booking for ${booking.tenantName}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Yes', handler: async () => {
            booking.status = 'rejected';
            const toast = await this.toastCtrl.create({
              message: 'Booking rejected.',
              duration: 3000,
              color: 'danger',
              position: 'top'
            });
            await toast.present();
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
    this.fetchBookedSlots();
  }

 fetchBookedSlots() {
  this.calendarService.getAllBookedSlots().subscribe({
    next: (data) => {
      this.bookings = data.map(slot => ({
        tenantName: slot.bookedBy?.fullName || 'Unknown Tenant',
        propertyName: slot.property?.name || 'Unknown Property',
        maxGuests: slot.maxGuests,
        bookingPolicy: slot.bookingPolicy,
        status: slot.status,
        availableDate: slot.availableDate,
      }));
    },
    error: (err) => {
      console.error('Failed to load booked slots', err);
    }
  });
}

}

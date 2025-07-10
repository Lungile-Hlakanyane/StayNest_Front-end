import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-booking-oversight',
  templateUrl: './admin-booking-oversight.component.html',
  styleUrls: ['./admin-booking-oversight.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AdminBookingOversightComponent  implements OnInit {

    bookings = [
    {
      tenantName: 'Sipho Mokoena',
      propertyName: 'Hilltop Apartments',
      checkIn: '2025-08-10',
      checkOut: '2025-08-15',
      status: 'pending'
    },
    {
      tenantName: 'Nadine Radebe',
      propertyName: 'Seaside Villa',
      checkIn: '2025-07-02',
      checkOut: '2025-07-09',
      status: 'approved'
    },
    {
      tenantName: 'James Zulu',
      propertyName: 'Mountain Retreat',
      checkIn: '2025-06-01',
      checkOut: '2025-06-05',
      status: 'checked-out'
    }
  ];

  constructor(
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController,
    private router:Router
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

  ngOnInit() {}

}

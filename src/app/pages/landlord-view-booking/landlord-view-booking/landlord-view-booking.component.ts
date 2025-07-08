import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController, ToastController,ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landlord-view-booking',
  templateUrl: './landlord-view-booking.component.html',
  styleUrls: ['./landlord-view-booking.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class LandlordViewBookingComponent  implements OnInit {

  booking: any;

  constructor(
    private navCtrl: NavController,
    private alertController:AlertController,
    private toastController:ToastController,
    private router:Router,
    private actionSheetController:ActionSheetController
  ) { }

  ngOnInit() {
    this.booking = {
      propertyName: 'Luxury Apartment - Sandton',
      propertyImage: 'assets/images/property1.jpg',
      location: 'Sandton, Johannesburg',

      tenantName: 'Thabo Mokoena',
      tenantEmail: 'thabo@gmail.com',
      tenantPhone: '+27 61 234 5678',
      tenantImage: 'assets/images/profile-thabo.jpg',

      checkIn: '2025-08-01',
      checkOut: '2025-08-05',
      duration: 4,

      totalPaid: 3800,
      paymentStatus: 'Paid',
      paymentMethod: 'Card',

      status: 'Pending',
      dateBooked: '2025-07-12',

      guests: 2,
      notes: 'Will arrive late at 10 PM.',
      policy: 'Fully refundable up to 48 hours before check-in.'
    };
  }

  goBack(){
    this.navCtrl.back();
  }

 async checkInVisitor() {
  const alert = await this.alertController.create({
    header: 'Confirm Check-In',
    message: 'You are about to Check In this visitor?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'alert-button-cancel'
      },
      {
        text: 'Yes',
        handler: async () => {
          const toast = await this.toastController.create({
            message: 'You have checked in this user...',
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


navigateToChat() {
  this.router.navigateByUrl('/chat');
}

async presentInvoiceActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Invoice Options',
      buttons: [
        {
          text: 'Download Invoice',
          icon: 'download',
          handler: () => {
            console.log('Download Invoice clicked');
          },
        },
        {
          text: 'View Invoice',
          icon: 'eye',
          handler: () => {
            console.log('View Invoice clicked');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }


}

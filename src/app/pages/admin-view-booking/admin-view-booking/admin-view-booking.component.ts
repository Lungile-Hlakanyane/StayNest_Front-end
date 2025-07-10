import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule, NavController, } from '@ionic/angular';

@Component({
  selector: 'app-admin-view-booking',
  templateUrl: './admin-view-booking.component.html',
  styleUrls: ['./admin-view-booking.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AdminViewBookingComponent  implements OnInit {

  booking: any;

  constructor(
     private navCtrl: NavController,
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

  goBack(){
    this.navCtrl.back();
  }

}

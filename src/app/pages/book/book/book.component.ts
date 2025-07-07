import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalController, LoadingController } from '@ionic/angular';
import { SuccessBookingComponent } from 'src/app/re-useable-components/success-booking/success-booking/success-booking.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class BookComponent  implements OnInit {

  constructor(
     private navCtrl: NavController,
     private loadingController:LoadingController,
     private modalController:ModalController
  ) { }

  ngOnInit() {}

   booking = {
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: ''
  };

async submitBooking() {
    console.log('Booking Submitted:', this.booking);
    const loading = await this.loadingController.create({
      message: 'Booking accommodation...',
      spinner: 'crescent',
      duration: 2000 
    });
    await loading.present();
    setTimeout(async () => {
      await loading.dismiss();
      const modal = await this.modalController.create({
        component: SuccessBookingComponent,
        cssClass: 'booking-success-modal'
      });

      await modal.present();
    }, 2000);
  }

  goBack(){
    this.navCtrl.back();
  }


}

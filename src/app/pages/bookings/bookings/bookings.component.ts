import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RateAccomodationModalComponent } from 'src/app/re-useable-components/rate-accomodation-modal/rate-accomodation-modal/rate-accomodation-modal.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class BookingsComponent  implements OnInit {

  selectedSegment: string = 'all';

  bookings = [
    {
      name: 'GreenVilla Lodge',
      image: 'assets/accomodation_01.jpeg',
      status: 'upcoming',
      checkIn: '2025-08-10',
      checkOut: '2025-08-15'
    },
    {
      name: 'Urban Nest',
      image: 'assets/accomodation_02.jpeg',
      status: 'past',
      checkIn: '2025-06-01',
      checkOut: '2025-06-05'
    },
  ];

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private modalController:ModalController,
  ) { }

  ngOnInit() {}

  get filteredBookings() {
    if (this.selectedSegment === 'all') return this.bookings;
    return this.bookings.filter(b => b.status === this.selectedSegment);
  }

  cancelBooking(booking: any) {
    console.log('Cancel booking:', booking);
  }

  viewDetails(booking: any) {
    console.log('View details:', booking);
  }

  navigateToChat(){
    this.navCtrl.navigateForward('/chat');
  }

  async rateBooking() {
  const modal = await this.modalController.create({
    component: RateAccomodationModalComponent,
    cssClass: 'rate-modal',
    backdropDismiss: true,
    animated: true
  });
  await modal.present();
  const { data } = await modal.onDidDismiss();
  if (data) {
    console.log('Rating submitted:', data);
  }
}

}

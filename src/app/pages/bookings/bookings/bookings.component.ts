import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RateAccomodationModalComponent } from 'src/app/re-useable-components/rate-accomodation-modal/rate-accomodation-modal/rate-accomodation-modal.component';
import { CalendarService } from 'src/app/servicess/calendar-service/calendar.service';
import { PropertyService } from 'src/app/servicess/property-service/property.service';
import { BookingWithProperty } from 'src/app/models/BookingWithProperty';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class BookingsComponent  implements OnInit {

  selectedSegment: string = 'all';
  userId!: number;
  allBookings: BookingWithProperty[] = [];
  filteredBookings: BookingWithProperty[] = [];

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private modalController:ModalController,
    private slotService:CalendarService,
    private propertyService:PropertyService
  ) { }

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    this.userId = userStr ? Number(userStr) : 0;
    this.loadBookings();
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

 loadBookings() {
  this.slotService.getSlotsByUserId().subscribe((slots: any[]) => {
    const bookingsWithPropertyDetails = slots.map(slot =>
      this.propertyService.getPropertyById(slot.propertyId).toPromise().then((property: any) => {
        return {
          id: slot.id,
          checkIn: slot.availabilityDates?.[0],  
          checkOut: slot.availabilityDates?.[0],
          status: slot.status,
          name: property.name,
          image: property.image || 'assets/default-property.jpg',
          location: property.location || '', // Added location property
          description: property.description,
          maxGuests: slot.maxGuests,
          bookingPolicy: slot.bookingPolicy,
          propertyId: slot.propertyId
        };
      })
    );

    Promise.all(bookingsWithPropertyDetails).then((results) => {
      this.allBookings = results;
      this.filterBookings();
    });
  });
}




  filterBookings() {
    if (this.selectedSegment === 'all') {
      this.filteredBookings = this.allBookings;
    } else {
      this.filteredBookings = this.allBookings.filter(
        b => b.status === this.selectedSegment
      );
    }
  }

  segmentChanged(event: any) {
   this.selectedSegment = event.detail.value;
   this.filterBookings();
}
}

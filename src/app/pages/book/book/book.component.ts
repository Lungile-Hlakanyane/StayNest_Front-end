import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { SuccessBookingComponent } from 'src/app/re-useable-components/success-booking/success-booking/success-booking.component';
import { CalendarService } from 'src/app/servicess/calendar-service/calendar.service';
import { Router } from '@angular/router';
import { Slot } from 'src/app/models/Slot';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class BookComponent  implements OnInit {
  accommodation: any;
  slots: Slot[] = [];
  guestError: string = '';

  constructor(
     private navCtrl: NavController,
     private loadingController:LoadingController,
     private modalController:ModalController,
     private calendarService: CalendarService,
     private router:Router,
     private alertController:AlertController
  ) { 
    const nav = this.router.getCurrentNavigation();
    this.accommodation = nav?.extras.state?.['accommodation'];
  }

  ngOnInit() {
     if (this.accommodation?.id) {
      this.fetchCalendarSlots(this.accommodation.id);
    }
  }

booking = {
  guests: 1,
  message: '',
  selectedSlot: null as Slot | null
};


async submitBooking() {
  const userId = Number(localStorage.getItem('user'));
  if (!this.booking.selectedSlot || this.booking.guests > this.booking.selectedSlot.maxGuests) {
    return;
  }
  const loading = await this.loadingController.create({
    message: 'Booking accommodation...',
    spinner: 'crescent'
  });
  await loading.present();
  this.calendarService.bookSlot(this.booking.selectedSlot.id, userId).subscribe({
    next: async () => {
      await loading.dismiss();
      const modal = await this.modalController.create({
        component: SuccessBookingComponent,
        cssClass: 'booking-success-modal'
      });
      await modal.present();
    },
    error: async () => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to book the slot.',
        buttons: ['OK']
      });
      await alert.present();
    }
  });
}


goBack(){
  this.navCtrl.back();
}

  fetchCalendarSlots(propertyId: number) {
    this.calendarService.getSlotsByProperty(propertyId).subscribe({
      next: (slots) => {
        this.slots = slots.filter(slot => slot.status === 'available');
      },
      error: (err) => {
        console.error('Failed to fetch slots:', err);
      }
    });
  }

selectSlot(slot: any) {
  this.booking.selectedSlot = slot;
}

validateGuests() {
  if (
    this.booking.selectedSlot &&
    this.booking.guests > this.booking.selectedSlot.maxGuests
  ) {
    this.guestError = `Maximum allowed guests: ${this.booking.selectedSlot.maxGuests}`;
    this.booking.guests = this.booking.selectedSlot.maxGuests;
  } else {
    this.guestError = '';
  }
}


}

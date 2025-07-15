import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController, ToastController, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from 'src/app/servicess/calendar-service/calendar.service';

@Component({
  selector: 'app-calendar-slots',
  templateUrl: './calendar-slots.component.html',
  styleUrls: ['./calendar-slots.component.scss'],standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class CalendarSlotsComponent  implements OnInit {

  slots: any[] = [];
  propertyId!: number;

  constructor(
    private route: ActivatedRoute,
    private calendarService: CalendarService,
    private navCtrl: NavController, 
    private toastCtrl: ToastController) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('propertyId');
    this.propertyId = id ? Number(id) : 0;
    if (this.propertyId > 0) {
      this.fetchSlots();
    }
  }

   goBack() {
    this.navCtrl.back();
  }

  viewSlot(slot: any) {
    console.log('Viewing slot:', slot);
  }

  async deleteSlot(slot: any) {
    this.slots = this.slots.filter(s => s !== slot);
    const toast = await this.toastCtrl.create({
      message: 'Slot removed.',
      duration: 2000,
      color: 'warning'
    });
    await toast.present();
  }

  fetchSlots() {
    this.calendarService.getSlotsByProperty(this.propertyId).subscribe({
      next: (data) => {
        this.slots = data.map(slot => ({
          date: slot.availableDate,
          maxGuests: slot.maxGuests,
          policy: slot.bookingPolicy,
          status: slot.status
        }));
      },
      error: (err) => {
        console.error('Failed to load slots:', err);
      }
    });
  }

}

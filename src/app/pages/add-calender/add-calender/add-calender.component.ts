import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController, ToastController, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from 'src/app/servicess/calendar-service/calendar.service';

@Component({
  selector: 'app-add-calender',
  templateUrl: './add-calender.component.html',
  styleUrls: ['./add-calender.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AddCalenderComponent  implements OnInit {
  availabilityDates: string[] = [];
  maxGuests: number | null = null;
  bookingPolicy: string = '';
  propertyId: number = 0;


  constructor(
    private route:ActivatedRoute,
    private calendarService:CalendarService,
    private loadingController: LoadingController,
    private toastController: ToastController, 
    private navCtrl: NavController)
  { }

  ngOnInit() {
    this.propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
  }

  goBack(){
    this.navCtrl.back();
  }

async submitCalendar() {
  if (!this.availabilityDates.length || !this.maxGuests || !this.bookingPolicy.trim()) {
    const toast = await this.toastController.create({
      message: 'Please fill all fields.',
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
    return;
  }

  const userId = Number(localStorage.getItem('user'));

  const calendarData = {
    availabilityDates: this.availabilityDates,
    maxGuests: this.maxGuests,
    bookingPolicy: this.bookingPolicy,
    propertyId: this.propertyId,
    userId: userId
  };

  const loading = await this.loadingController.create({ message: 'Submitting...' });
  await loading.present();

  this.calendarService.addCalendarSlot(calendarData).subscribe({
    next: async () => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Calendar added successfully!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      this.navCtrl.back();
    },
    error: async (err) => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Failed to submit calendar.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
      console.error(err);
    }
  });
}



}

import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDTO } from 'src/app/models/UserDTO';
import { CalendarService } from 'src/app/servicess/calendar-service/calendar.service';

@Component({
  selector: 'app-accomodation-details',
  templateUrl: './accomodation-details.component.html',
  styleUrls: ['./accomodation-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AccomodationDetailsComponent  implements OnInit {

  slots: any[] = [];

  accommodation: any;
  landlord: UserDTO | null = null;

  constructor(
    private route: ActivatedRoute, 
    private router:Router, 
    private navCtrl: NavController,
    private toastController: ToastController,
    private slotService:CalendarService
    ) 
  {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { post: any };
   if (state?.post) {
    this.accommodation = state.post;
   } else {
    this.presentErrorToast();
   }

   const propertyId = this.route.snapshot.params['id']; // or however you get the property ID
   this.slotService.getSlotsByProperty(propertyId).subscribe((data) => {
    this.slots = data;
  });
  }

  bookNow() {
    this.router.navigate(['/book'], { state: { accommodation: this.accommodation } });
    console.log('Booking:', this.accommodation);
  }

  async addToFavorites() {
    console.log('Added to favorites:', this.accommodation.id);
    const toast = await this.toastController.create({
      message: 'Added to favorites',
      duration: 2000, 
      color: 'success',
      position: 'top'
    });

    await toast.present();
  }

  goBack(){
    this.navCtrl.back();
  }

  async presentErrorToast() {
  const toast = await this.toastController.create({
    message: 'Failed to load accommodation details.',
    duration: 2000,
    color: 'danger',
    position: 'top'
  });
  await toast.present();
  this.navCtrl.back();
}

}

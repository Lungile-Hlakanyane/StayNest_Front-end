import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-rate-accomodation-modal',
  templateUrl: './rate-accomodation-modal.component.html',
  styleUrls: ['./rate-accomodation-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class RateAccomodationModalComponent  implements OnInit {
  rating = 0;
  stars = [1, 2, 3, 4, 5];
  comment = '';


  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {}

  setRating(star: number) {
    this.rating = star;
  }

  dismiss(){
    this.modalController.dismiss();
  }

   async submitRating() {
    if (this.rating === 0) {
      const toast = await this.toastController.create({
        message: 'Please select a rating.',
        duration: 2000,
        color: 'danger',
        position: 'top',
      });
      toast.present();
      return;
    }

    const toast = await this.toastController.create({
      message: `Thank you! You rated ${this.rating} star(s).`,
      duration: 2000,
      color: 'success',
      position: 'top',
    });
    toast.present();

    this.rating = 0;
    this.comment = '';
  }

}

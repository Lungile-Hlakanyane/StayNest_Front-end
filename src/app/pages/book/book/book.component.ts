import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonTextarea,
  IonDatetime
} from '@ionic/angular';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class BookComponent  implements OnInit {

  constructor(
     private navCtrl: NavController
  ) { }

  ngOnInit() {}

   booking = {
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: ''
  };

  submitBooking() {
    console.log('Booking Submitted:', this.booking);
  }

  goBack(){
    this.navCtrl.back();
  }


}

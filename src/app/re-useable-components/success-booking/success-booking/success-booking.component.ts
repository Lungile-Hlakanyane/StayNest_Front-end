import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-booking',
  templateUrl: './success-booking.component.html',
  styleUrls: ['./success-booking.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class SuccessBookingComponent  implements OnInit {

  constructor(
    private modalController:ModalController,
    private router:Router
  ) { }

  ngOnInit() {}

  dissmiss(){
    this.modalController.dismiss();
  }

  async navigateToPayment(){
    await this.dissmiss();
    this.router.navigate(['/make-payment']);
  }

}

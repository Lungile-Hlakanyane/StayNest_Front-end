import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class SuccessPaymentComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  dissmiss(){
    this.modalController.dismiss().then(() => {
      this.router.navigate(['/home']);
    });
  }


}

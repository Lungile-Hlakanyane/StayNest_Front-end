import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class BankDetailsComponent  implements OnInit {
    bankDetails = {
    cardholder: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  constructor(
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  goBack() {
    this.router.navigate(['/saved-cards']);
  }

  ngOnInit() {}

  async submitBankDetails() {
    const toast = await this.toastCtrl.create({
      message: 'Bank details saved successfully!',
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }

}

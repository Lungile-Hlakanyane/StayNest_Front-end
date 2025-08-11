import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController, LoadingController, } from '@ionic/angular';
import { BankDetailsService } from 'src/app/servicess/bank-details-service/bank-details.service';

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
    private router: Router,
    private bankDetailsService:BankDetailsService,
    private loadingController: LoadingController
  ) { }

  goBack() {
    this.router.navigate(['/saved-cards']);
  }

  ngOnInit() {}

 async submitBankDetails() {
  const landlordId = localStorage.getItem('user');
  const payload = {
    ...this.bankDetails,
    landlordId: landlordId ? Number(landlordId) : null
  };
  this.bankDetailsService.saveBankDetails(payload).subscribe({
    next: async () => {
      const toast = await this.toastCtrl.create({
        message: 'Bank details saved successfully!',
        duration: 3000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      this.router.navigate(['/saved-cards']);
    },
    error: async (err) => {
      const toast = await this.toastCtrl.create({
        message: 'Failed to save bank details. Please try again.',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
      console.error('Error saving bank details:', err);
    }
  });
}


}

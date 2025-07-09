import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-saved-cards',
  templateUrl: './saved-cards.component.html',
  styleUrls: ['./saved-cards.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class SavedCardsComponent  implements OnInit {
   savedCards = [
    {
      last4: '4242',
      expiry: '12/26',
      cardholder: 'Lungile Hlakanyane'
    },
    {
      last4: '1122',
      expiry: '04/25',
      cardholder: 'StayNest Rentals'
    }
  ];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}

    goBack() {
    this.router.navigate(['/home']);
  }

  async removeCard(card: any) {
    const alert = await this.alertCtrl.create({
      header: 'Remove Card',
      message: `Are you sure you want to remove card ending in ${card.last4}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Yes, Remove',
          handler: async () => {
            this.savedCards = this.savedCards.filter(c => c !== card);
            const toast = await this.toastCtrl.create({
              message: 'Card removed successfully',
              duration: 3000,
              color: 'danger',
              position: 'top'
            });
            await toast.present();
          }
        }
      ]
    });

    await alert.present();
  }

  addNewBankAccount() {
    this.router.navigate(['/bank-details']);
  }

}

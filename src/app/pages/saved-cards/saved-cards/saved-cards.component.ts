import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { BankDetailsService } from 'src/app/servicess/bank-details-service/bank-details.service';

@Component({
  selector: 'app-saved-cards',
  templateUrl: './saved-cards.component.html',
  styleUrls: ['./saved-cards.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class SavedCardsComponent  implements OnInit {

  savedCards: any = [];
    
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private bankCardDetailsService: BankDetailsService
  ) { }

  ngOnInit() {
    this.loadSavedCards();
  }

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
           this.bankCardDetailsService.deleteCard(card.id).subscribe({
           next: async () => {
           this.savedCards = this.savedCards.filter((c: any) => c.id !== card.id);
           const toast = await this.toastCtrl.create({
           message: 'Card removed successfully',
           duration: 3000,
           color: 'success',
           position: 'top'
        });
         await toast.present();
       },
       error: async (err) => {
         const toast = await this.toastCtrl.create({
         message: 'Error removing card',
         duration: 3000,
         color: 'warning',
         position: 'top'
        });
        await toast.present();
        console.error('Delete error:', err);
     }
    });
   }
  }
    ]
  });

    await alert.present();
  }

  addNewBankAccount() {
    this.router.navigate(['/bank-details']);
  }

loadSavedCards() {
  const landlordId = localStorage.getItem('user');
  if (!landlordId) {
    console.error('No landlordId found in local storage');
    return;
  }
  this.bankCardDetailsService.getBankDetailsByUser(Number(landlordId))
    .subscribe({
      next: (cards: any[]) => {
       this.savedCards = cards.map(card => ({
       id: card.id,  // <-- include id from backend
       last4: card.last4Digits, 
       expiry: card.expiry,
       cardholder: card.cardholder
      }));
      },
      error: (err) => {
        console.error('Error fetching saved cards:', err);
      }
    });
}

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { SuccessPaymentComponent } from '../../success-payment/success-payment/success-payment.component';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class MakePaymentComponent  implements OnInit {

  paymentMethod: string = '';
  cardDetails = {
    cardholder: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  constructor(
    private toastController: ToastController,  
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

 
  async submitPayment() {
  const loading = await this.loadingController.create({
    message: 'Loading...',
    spinner: 'crescent',
    duration: 2000 
  });
  await loading.present();
  setTimeout(async () => {
    await loading.dismiss();
    const modal = await this.modalController.create({
      component: SuccessPaymentComponent,
      cssClass: 'booking-success-modal',
      backdropDismiss: false
    });
    await modal.present();
  }, 2000);
  }

  goBack(){
    this.navCtrl.back();
  }


}

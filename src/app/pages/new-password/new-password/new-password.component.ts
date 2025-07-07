import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class NewPasswordComponent  implements OnInit {

  password: string = '';
  confirmPassword: string = '';

  constructor(
    private toastController: ToastController,  
    private navCtrl: NavController,) {}

  ngOnInit() {}

  async resetPassword() {
    if (this.password !== this.confirmPassword) {
      const toast = await this.toastController.create({
        message: 'Passwords do not match.',
        color: 'danger',
        duration: 3000,
        position:'top'
      });
      await toast.present();
      return;
    }

    if (this.password.length < 6) {
      const toast = await this.toastController.create({
        message: 'Password must be at least 6 characters.',
        color: 'warning',
        duration: 3000,
        position: 'top'
      });
      await toast.present();
      return;
    }

    const toast = await this.toastController.create({
      message: 'Password successfully updated!',
      color: 'success',
      duration: 3000,
      position: 'top'
    });
    await toast.present().then(() => {
      this.navCtrl.navigateRoot('/login');
    });
  }

   goBack(){
    this.navCtrl.back();
  }

}

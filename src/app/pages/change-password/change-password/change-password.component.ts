import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ChangePasswordComponent  implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
     private alertCtrl: AlertController,
     private navCtrl: NavController)
  { }

  ngOnInit() {}

  async submitChange() {
    if (this.newPassword !== this.confirmPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'New passwords do not match.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Here you'd call the backend to change the password
    const successAlert = await this.alertCtrl.create({
      header: 'Success',
      message: 'Password changed successfully.',
      buttons: ['OK']
    });
    await successAlert.present();

    // Reset form (optional)
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  goBack(){
    this.navCtrl.back();
  }
}

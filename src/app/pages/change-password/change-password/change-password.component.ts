import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/servicess/auth-service/auth.service';

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
  userId: number = 0;

  constructor(
    private userService:AuthService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingController: LoadingController
  )
  { }

  ngOnInit() {
    const storedUserId = localStorage.getItem('user');
    this.userId = storedUserId ? Number(storedUserId) : 0;
  }

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

  const loading = await this.loadingController.create({
    message: 'Changing password...',
    spinner: 'crescent'
  });
  await loading.present();

  const payload = {
    userId: this.userId,
    currentPassword: this.currentPassword,
    newPassword: this.newPassword
  };

  this.userService.changePassword(payload).subscribe({
    next: async () => {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'Password changed successfully.',
        buttons: ['OK']
      });
      await alert.present();
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    },
    error: async (err) => {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: err.error || 'Password change failed.',
        buttons: ['OK']
      });
      await alert.present();
    }
  });
}


  goBack(){
    this.navCtrl.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginComponent  implements OnInit {

  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private loadingController:LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

   async onLogin() {
    const loading = await this.loadingController.create({
      message: 'Logging In...',
      spinner: 'circles',
      duration: 3000
    });
    await loading.present();
    setTimeout(async () => {
      await loading.dismiss();
      if (this.loginData.email === 'landlord@gmail.com') {
        localStorage.setItem('role', 'Landlord');
      } else {
        localStorage.setItem('role', 'Tenant');
      }

      const toast = await this.toastController.create({
        message: 'You have successfully logged in the app...',
        duration: 3000,
        color: 'success',
        position: 'top'
      });

      await toast.present();
      this.router.navigate(['/home']);
    }, 2000);
  }


navigate(link: string){
 return this.router.navigate([link]);
}


}

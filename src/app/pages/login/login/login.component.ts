import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicess/auth-service/auth.service';

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

  rememberMe: boolean = false; 
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private loadingController:LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private authService:AuthService
  ) { }

  ngOnInit() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');

    if (rememberedEmail && rememberedPassword) {
      this.loginData.email = rememberedEmail;
      this.loginData.password = rememberedPassword;
      this.rememberMe = true;
    }
  }

  togglePasswordVisibility() {
   this.showPassword = !this.showPassword;
  }

 async onLogin() {
    const loading = await this.loadingController.create({
      message: 'Logging In...',
      spinner: 'crescent',
    });
    await loading.present();
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: async (res) => {
        await loading.dismiss();
        if (res && res.userId && res.role) {
          localStorage.setItem('user', res.userId);
          localStorage.setItem('role', res.role);
          if (this.rememberMe) {
            localStorage.setItem('rememberedEmail', this.loginData.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          await this.showToast('Login successful', 'success');
          if (res.role === 'landlord') {
            this.router.navigate(['/home']);
          } else if (res.role === 'admin') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.showToast('Invalid response from server', 'danger');
        }
      },
      error: async (err) => {
        await loading.dismiss();
        this.showToast(err.error?.message || 'Login failed', 'danger');
      }
    });
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color
    });
    await toast.present();
  }


navigate(link: string){
 return this.router.navigate([link]);
}


}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ForgotPasswordComponent  implements OnInit {

  email: string = '';

 constructor(
  private toastCtrl: ToastController,
  private navCtrl: NavController,
  private router:Router
) {}

  ngOnInit() {}

  async onReset() {
    const toast = await this.toastCtrl.create({
      message: 'If the email exists, reset instructions have been sent.',
      duration: 3000,
      color: 'primary',
      position: 'top',
    });
    await toast.present();

    this.email = ''; 
  }

  goBack(){
    this.navCtrl.back();
  }

  navigate(link:string){
    this.router.navigate([link]);
  }

}

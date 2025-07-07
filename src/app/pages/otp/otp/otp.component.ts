import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class OtpComponent  implements OnInit {

  otp: string[] = ['', '', '', '', ''];

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private router:Router
  ) {}

  ngOnInit() {
   
  }

onInputChange(index: number, event: any) {
  const input = event.target;
  const nextInput = input.nextElementSibling;
  if (input.value.length === 1 && nextInput) {
    nextInput.focus();
  }
}

  async verifyOtp() {

    this.router.navigate(['/new-password']);

  // const enteredOtp = this.otp.join('');

  // // Check if all 5 digits are filled
  // const isOtpComplete = this.otp.every(d => d && d.trim().length === 1);

  // if (isOtpComplete && enteredOtp.length === 5) {
  //   const toast = await this.toastCtrl.create({
  //     message: `OTP Verified: ${enteredOtp}`,
  //     duration: 3000,
  //     color: 'success'
  //   });
  //   await toast.present();
  //   this.router.navigate(['/new-password']);
  // } else {
  //   const toast = await this.toastCtrl.create({
  //     message: `Please enter all 5 digits`,
  //     duration: 3000,
  //     color: 'danger',
  //     position: 'top'
  //   });
  //   await toast.present();
  // }
}


  goBack(){
    this.navCtrl.back();
  }

  navigate(link:string){
    this.navCtrl.navigateForward(link);
  }

}

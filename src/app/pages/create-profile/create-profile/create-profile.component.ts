import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../servicess/auth-service/auth.service';
import { UserDTO } from 'src/app/models/UserDTO';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
})
export class CreateProfileComponent  implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  avatarPreview: string | ArrayBuffer | null = null;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private authService: AuthService

  ) { }

  user: UserDTO = {
    username: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    gender: ''
  }

  ngOnInit() {}

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  goBack(){
    this.navCtrl.back();
  }

  signUp() {
    this.loadingController.create({
      message: 'Creating profile...'
    }).then(loading => {
      loading.present();

      this.authService.register(this.user).subscribe({
        next: async (res) => {
          loading.dismiss();
          this.showToast('Registration successful! Check your email for activation.');
          this.router.navigate(['/login']);
        },
        error: async (err) => {
          loading.dismiss();
          this.showToast('Registration failed. Please try again.');
          console.error(err);
        }
      });
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

}




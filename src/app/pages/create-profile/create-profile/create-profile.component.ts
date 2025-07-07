import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule, LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CreateProfileComponent  implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  avatarPreview: string | ArrayBuffer | null = null;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }

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

  signUp(){
    this.loadingController.create({
      message: 'Creating profile...'
    }).then(loading => {
      loading.present();
      setTimeout(() => {
        loading.dismiss();
        this.router.navigate(['/login']);
        this.showToast('Profile created successfully!');
      }, 2000);
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




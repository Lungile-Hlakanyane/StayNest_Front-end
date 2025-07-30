import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController, LoadingController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicess/auth-service/auth.service';
import { UserDTO } from 'src/app/models/UserDTO';
import { UpdateUserDTO } from 'src/app/models/UpdateUserDTO';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class ProfileComponent  implements OnInit {

  profile = {
    avatar: '',
    fullName: '',
    email: '',
    phoneNumber: ''
  };

  isEditing = false;
  userId!: number;
  private originalProfile!: { fullName: string; phoneNumber: string };

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private authService:AuthService,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
    this.userId = Number(localStorage.getItem('user'));
    this.fetchUserProfile();
  }

  editProfile() {
    this.isEditing = true;
  }

  changePassword() {
    console.log('Change password clicked');
    this.router.navigate(['/change-password']);
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Logout',
          handler: () => {
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  fetchUserProfile() {
    const userId = Number(localStorage.getItem('user'));
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }
    this.authService.getUserById(userId).subscribe({
      next: (data: UserDTO) => {
        this.profile.fullName = data.fullName;
        this.profile.email = data.email;
        this.profile.phoneNumber = data.phoneNumber || 'Not provided';
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      }
    });
  }

  async saveProfile() {
  const loading = await this.loadingController.create({
    message: 'Updating Profile...',
    spinner: 'crescent',
  });
  await loading.present();

  const updatePayload: UpdateUserDTO = {
    userId: this.userId,
    fullName: this.profile.fullName,
    phoneNumber: this.profile.phoneNumber
  };

  this.authService.updateProfile(updatePayload).subscribe({
    next: async () => {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Success',
        message: 'Profile updated successfully.',
        buttons: ['OK']
      });
      await alert.present();
      this.isEditing = false;
    },
    error: async (err) => {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Failed to update profile.',
        buttons: ['OK']
      });
      await alert.present();
    }
  });
}

   cancelEdit() {
    // restore originals
    this.profile.fullName = this.originalProfile.fullName;
    this.profile.phoneNumber = this.originalProfile.phoneNumber;
    this.isEditing = false;
  }

}

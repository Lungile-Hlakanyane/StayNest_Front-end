import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicess/auth-service/auth.service';
import { UserDTO } from 'src/app/models/UserDTO';

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
    phone: ''
  };

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.fetchUserProfile();
  }

  editProfile() {
    console.log('Edit Profile clicked');
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
        this.profile.fullName = data.username;
        this.profile.email = data.email;
        this.profile.phone = data.phoneNumber || 'Not provided';
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      }
    });
  }
}

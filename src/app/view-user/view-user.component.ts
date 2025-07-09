import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class ViewUserComponent  implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
     const email = this.route.snapshot.paramMap.get('id');
    this.user = {
      fullName: 'Lungile Hlakanyane',
      email: 'lungilehlakanyane@gmail.com',
      role: 'Tenant',
      status: 'Active',
      photo: 'assets/profile-pic-image.jpg',
      phone: '065 635 2578',
      emergencyContact: '062 372 3317'
    };
  }

   async blockUser() {
    const alert = await this.alertCtrl.create({
      header: 'Block User',
      message: 'Are you sure you want to block this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: async () => {
            this.user.status = 'Blocked';
            const toast = await this.toastCtrl.create({
              message: 'User has been blocked.',
              duration: 3000,
              color: 'danger',
              position: 'top'
            });
            await toast.present();
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteUser() {
    const alert = await this.alertCtrl.create({
      header: 'Delete User',
      message: 'Are you sure you want to delete this user permanently?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            const toast = await this.toastCtrl.create({
              message: 'User deleted successfully.',
              duration: 3000,
              color: 'danger',
              position: 'top'
            });
            await toast.present();
            this.router.navigate(['/admin/users']);
          }
        }
      ]
    });

    await alert.present();
  }

  goBack() {
    this.router.navigate(['/manage-users']);
  }

}

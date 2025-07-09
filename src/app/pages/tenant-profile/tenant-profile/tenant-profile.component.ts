import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tenant-profile',
  templateUrl: './tenant-profile.component.html',
  styleUrls: ['./tenant-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class TenantProfileComponent  implements OnInit {

  tenant = {
    fullName: 'Lungile Hlakanyane',
    email: 'lungile@gmail.com',
    phone: '+27 123 456 7890',
    emergencyContact: '+27 987 654 3210',
    propertyName: 'Green Villa 103',
    roomNumber: 'Room 12B',
    checkInDate: '2025-07-01',
    checkOutDate: '2025-12-31',
    photo: 'assets/profile-pic-image.jpg'
  };

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  goBack() {
    this.router.navigate(['/tenant-list']);
  }

  ngOnInit() {}

  async blockTenant() {
    const alert = await this.alertCtrl.create({
      header: 'Block Tenant',
      message: 'Are you sure you want to block this tenant?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes, Block',
          handler: async () => {
            const toast = await this.toastCtrl.create({
              message: 'Tenant has been blocked successfully.',
              color: 'danger',
              duration: 3000,
              position: 'top'
            });
            await toast.present();
          }
        }
      ]
    });

    await alert.present();
  }

}

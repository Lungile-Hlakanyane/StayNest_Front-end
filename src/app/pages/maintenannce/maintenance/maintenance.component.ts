import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class MaintenanceComponent  implements OnInit {

   maintenanceRequests = [
    {
      title: 'Leaking Tap in Bathroom',
      description: 'The tap in the main bathroom is leaking continuously.',
      propertyName: 'Green Villa 103',
      tenantName: 'Lungile Hlakanyane',
      date: new Date('2025-07-15')
    },
    {
      title: 'Broken Window',
      description: 'One of the bedroom windows won’t close completely.',
      propertyName: 'Oceanview Apartment',
      tenantName: 'Thabo Nkosi',
      date: new Date('2025-07-14')
    }
  ];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/home']);
  }

  async approveRequest(request: any) {
    const toast = await this.toastCtrl.create({
      message: `Approved: ${request.title}`,
      color: 'success',
      duration: 3000,
      position: 'top'
    });
    await toast.present();
  }

   async rejectRequest(request: any) {
    const alert = await this.alertCtrl.create({
      header: 'Reject Request',
      message: `Are you sure you want to reject "${request.title}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes, Reject',
          handler: async () => {
            const toast = await this.toastCtrl.create({
              message: `Rejected: ${request.title}`,
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

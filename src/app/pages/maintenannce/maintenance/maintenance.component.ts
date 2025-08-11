import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MaintenanceService } from 'src/app/servicess/maintenance-service/maintenance.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class MaintenanceComponent  implements OnInit {

   maintenanceRequests: any[] = [];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private maintenanceService: MaintenanceService
  ) { }

  ngOnInit() {
    this.loadMaintenanceRequests();
  }

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

  loadMaintenanceRequests() {
    const currentUserId = localStorage.getItem('user');
    if (!currentUserId) {
      console.error('No logged-in user ID found in localStorage.');
      return;
    }
    this.maintenanceService.getAllRequests().subscribe({
      next: (requests: any[]) => {
        this.maintenanceRequests = requests.filter(r => r.userId == currentUserId);
      },
      error: (err) => {
        console.error('Failed to fetch maintenance requests:', err);
      }
    });
  }

  updateStatus(request: any, status: string) {
  this.maintenanceService.updateStatus(request.id, status).subscribe({
    next: updatedRequest => {
      const index = this.maintenanceRequests.findIndex(r => r.id === updatedRequest.id);
      if (index > -1) {
        this.maintenanceRequests[index].status = updatedRequest.status;
      }
      this.toastCtrl.create({
        message: `Status updated to ${status} for "${updatedRequest.title}"`,
        color: 'success',
        duration: 2000,
        position: 'top'
      }).then(toast => toast.present());
    },
    error: err => {
      this.toastCtrl.create({
        message: 'Failed to update status. Try again.',
        color: 'danger',
        duration: 2000,
        position: 'top'
      }).then(toast => toast.present());
    }
  });
}


}

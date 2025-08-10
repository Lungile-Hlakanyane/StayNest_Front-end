import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController, ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ReportReasonsModalComponent } from 'src/app/re-useable-components/report-reasons-modal/report-reasons-modal/report-reasons-modal.component';
import { ReportService } from 'src/app/servicess/report-service/report.service';

@Component({
  selector: 'app-tenant-profile',
  templateUrl: './tenant-profile.component.html',
  styleUrls: ['./tenant-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class TenantProfileComponent  implements OnInit {

tenant = {
  fullName: '',
  email: '',
  phoneNumber: '',
  emergencyContact: '',
  propertyName: '',
  roomNumber: '',
  checkInDate: '',
  checkOutDate: '',
  photo: 'assets/profile-pic-image.jpg',
  availableDate: '',
  id: 0,
};

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private location: Location,
    private modalController: ModalController,
    private reportService: ReportService
  ) { }

  goBack() {
    this.router.navigate(['/tenant-list']);
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { tenant: any };
    if (state?.tenant) {
    this.tenant = state.tenant;
    }
}

async reportTenant() {
    const modal = await this.modalController.create({
      component: ReportReasonsModalComponent,
      cssClass: 'booking-success-modal',
      backdropDismiss: true,
      animated: true,
      componentProps: {
        tenantId: this.tenant.id
      }
    });
    await modal.present();
    const { data: selectedReason } = await modal.onDidDismiss();
    if (selectedReason) {
      const landlordId = Number(localStorage.getItem('user'));
      const reportData = {
        landlordId: landlordId,
        tenantId: this.tenant.id,
        reason: selectedReason
      };

      this.reportService.reportTenant(reportData).subscribe({
        next: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Tenant reported successfully.',
            color: 'danger',
            duration: 3000,
            position: 'top'
          });
          await toast.present();
        },
        error: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Failed to report tenant. Try again later.',
            color: 'warning',
            duration: 3000,
            position: 'top'
          });
          await toast.present();
        }
      });
    }
  }

}

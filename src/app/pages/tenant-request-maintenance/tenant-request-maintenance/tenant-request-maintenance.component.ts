import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavController, ToastController, LoadingController, ModalController, IonicModule } from '@ionic/angular';
import { IonContent } from "@ionic/angular/standalone";
import { MaintenanceService } from 'src/app/servicess/maintenance-service/maintenance.service';
import { MaintenanceRequest } from 'src/app/models/MaintenanceRequest';

@Component({
  selector: 'app-tenant-request-maintenance',
  templateUrl: './tenant-request-maintenance.component.html',
  styleUrls: ['./tenant-request-maintenance.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class TenantRequestMaintenanceComponent  implements OnInit {

  form: MaintenanceRequest = {
    title: '',
    description: '',
    propertyName: '',
    tenantName: 'Lungile Hlakanyane', // Ideally from auth/user context
    date: new Date().toISOString(),
  };


  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private maintenanceService:MaintenanceService
  ) { }

  ngOnInit() {}

  goBack(){
    this.navCtrl.back();
  }

async submitRequest() {
    const loading = await this.loadingCtrl.create({
      message: 'Submitting...',
      spinner: 'crescent'
    });
    await loading.present();

    this.maintenanceService.createRequest(this.form).subscribe({
      next: async (res) => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Request submitted successfully!',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        toast.present();
        this.navCtrl.back();
      },
      error: async (err) => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Submission failed. Try again later.',
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        toast.present();
      }
    });
  }


}

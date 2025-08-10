import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ReportDTO } from 'src/app/models/ReportDTO';
import { AlertController, ToastController } from '@ionic/angular';
import { ReportService } from 'src/app/servicess/report-service/report.service';
import { AuthService } from 'src/app/servicess/auth-service/auth.service';
import { UserDTO } from 'src/app/models/UserDTO';

@Component({
  selector: 'app-manage-reports',
  templateUrl: './manage-reports.component.html',
  styleUrls: ['./manage-reports.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class ManageReportsComponent  implements OnInit {

  reports: ReportDTO[] = [];

  constructor(
    private navController:NavController,
    private alertController: AlertController,
    private reportService: ReportService,
    private userService: AuthService,
    private toastController:ToastController
  ) { }

  goBack(){
    this.navController.back();
  }

  ngOnInit() {
    this.loadReports()
  }

  fetchReports() {
    this.reportService.getAllReports().subscribe(data => {
      this.reports = data;
    });
  }

  async openMenuModal() {
    const alert = await this.alertController.create({
      header: 'Menu',
      message: 'Menu Modal Placeholder',
      buttons: ['OK']
    });
    await alert.present();
  }

  loadReports(): void {
  this.reportService.getAllReports().subscribe({
    next: (data: ReportDTO[]) => {
      this.reports = data;

      this.reports.forEach(report => {
        // Fetch tenant full name
        this.userService.getUserById(report.tenantId).subscribe({
          next: (user: UserDTO) => {
            report.tenantFullName = user.fullName;
          },
          error: (err) => {
            console.error(`Failed to fetch tenant ${report.tenantId}`, err);
            report.tenantFullName = 'Unknown';
          }
        });

        // Fetch landlord full name
        this.userService.getUserById(report.landlordId).subscribe({
          next: (user: UserDTO) => {
            report.landlordFullName = user.fullName;
          },
          error: (err) => {
            console.error(`Failed to fetch landlord ${report.landlordId}`, err);
            report.landlordFullName = 'Unknown';
          }
        });
      });
    },
    error: (err) => {
      console.error('Error fetching reports:', err);
    }
  });  
}


blockTenant(tenantId: number) {
  this.alertController.create({
    header: 'Confirm Block',
    message: 'Are you sure you want to block this user?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Yes',
        handler: () => {
          // Call backend to block user
          this.userService.blockUser(tenantId, true).subscribe({
            next: () => {
              this.toastController.create({
                message: 'User has been successfully blocked',
                duration: 2000,
                color: 'success',
                position: 'top',
              }).then(toast => toast.present());
            },
            error: (err) => {
              console.error('Failed to block user:', err);
              this.toastController.create({
                message: 'Failed to block user',
                duration: 2000,
                color: 'danger'
              }).then(toast => toast.present());
            }
          });
        }
      }
    ]
  }).then(alert => alert.present());
}


deleteReport(id: number) {
  this.alertController.create({
    header: 'Confirm Delete',
    message: 'Are you sure you want to delete this report?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Delete',
        handler: () => {
          this.reportService.deleteReport(id).subscribe({
            next: () => {
              this.toastController.create({
                message: 'Report deleted successfully.',
                duration: 2000,
                color: 'success',
                position: 'top'
              }).then(toast => toast.present());

              // Refresh reports or remove from list
              this.reports = this.reports.filter(report => report.id !== id);
            },
            error: () => {
              this.toastController.create({
                message: 'Failed to delete report.',
                duration: 2000,
                color: 'danger',
                position: 'top'
              }).then(toast => toast.present());
            }
          });
        }
      }
    ]
  }).then(alert => alert.present());
}

}

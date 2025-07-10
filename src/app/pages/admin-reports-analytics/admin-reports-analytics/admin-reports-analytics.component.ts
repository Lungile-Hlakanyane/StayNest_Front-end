import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, ToastController } from '@ionic/angular';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-reports-analytics',
  templateUrl: './admin-reports-analytics.component.html',
  styleUrls: ['./admin-reports-analytics.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AdminReportsAnalyticsComponent  implements OnInit {

  totalEarnings = 48400;
  earningsThisMonth = 7320;
  earningsThisYear = 38400;
  occupancyRate = 82;

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadMonthlyChart();
    this.loadUserGrowthChart();
  }

  loadMonthlyChart() {
    new Chart('monthlyChart', {
      type: 'bar',
      data: {
        labels: ['North', 'South', 'East', 'West', 'Central'],
        datasets: [{
          label: 'Earnings by Region (R)',
          data: [9500, 8200, 10200, 7600, 8900],
          backgroundColor: '#4caf50'
        }]
      }
    });
  }

  loadUserGrowthChart() {
    new Chart('userGrowthChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'User Signups',
          data: [120, 145, 160, 180, 210, 190, 230],
          borderColor: '#4caf50',
          fill: false
        }]
      }
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  downloadReport() {
    this.toastController.create({
      message: 'Admin report download started...',
      duration: 2000,
      position: 'top',
      color: 'success'
    }).then(toast => toast.present());
  }

}

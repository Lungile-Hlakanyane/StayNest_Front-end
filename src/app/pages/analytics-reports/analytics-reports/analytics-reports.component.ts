import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import Chart from 'chart.js/auto';
// Chart.register(...registerables);

@Component({
  selector: 'app-analytics-reports',
  templateUrl: './analytics-reports.component.html',
  styleUrls: ['./analytics-reports.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AnalyticsReportsComponent  implements OnInit {
  totalEarnings = 15480;
  earningsThisMonth = 3240;
  earningsThisYear = 12700;
  occupancyRate = 78;

  constructor(
    private navCtrl: NavController,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    this.loadMonthlyChart();
    this.loadYearlyChart();
  }

   loadMonthlyChart() {
    new Chart('monthlyChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Earnings (R)',
          data: [1200, 1500, 1800, 2000, 2200, 2500, 2400],
          backgroundColor: '#4caf50'
        }]
      }
    });
  }

  loadYearlyChart() {
    new Chart('yearlyChart', {
      type: 'line',
      data: {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        datasets: [{
          label: 'Annual Earnings (R)',
          data: [24000, 27000, 30000, 35000, 38400],
          borderColor: '#4caf50',
          fill: false
        }]
      }
    });
  }

  goBack(){
    this.navCtrl.back();
  }

downloadReport() {
  console.log('Download report triggered');
  this.toastController.create({
    message: 'Report download started...',
    duration: 2000,
    position: 'top',
    color: 'success'
  }).then(toast => toast.present());
}


}

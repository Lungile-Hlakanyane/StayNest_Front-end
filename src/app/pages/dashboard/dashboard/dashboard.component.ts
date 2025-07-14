import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/servicess/property-service/property.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class DashboardComponent  implements OnInit {
  propertiesCount = 3;
  upcomingBookings = 5;
  earnings = 12500;
  pendingRequests = 2;

  constructor(
    private propertyService:PropertyService,
    private navCtrl: NavController, 
    private router: Router)
  { }

  ngOnInit() {
    this.propertyCount();
  }

  goToAddProperty() {
    this.navCtrl.navigateForward('/add-property');
  }

  goToProperties() {
    this.navCtrl.navigateForward('/my-properties');
  }

  navigate(link: string) {
    this.router.navigate([link]); 
  }

  async propertyCount(){
      const userId = localStorage.getItem('user');
  if (userId) {
    this.propertyService.countPropertiesByUserId(+userId).subscribe({
      next: (count) => {
        this.propertiesCount = count;
      },
      error: (err) => {
        console.error('Error fetching property count', err);
      }
    });
  }
  }

}

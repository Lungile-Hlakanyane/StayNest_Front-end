import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private navCtrl: NavController, 
    private router: Router)
  { }

  ngOnInit() {}

   goToAddProperty() {
    this.navCtrl.navigateForward('/add-property');
  }

  goToProperties() {
    this.navCtrl.navigateForward('/my-properties');
  }

  navigate(link: string) {
    this.router.navigate([link]); 
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AdminDashboardComponent  implements OnInit {
  totalUsers = 214;
  totalProperties = 78;
  totalBookings = 342;
  totalEarnings = 148320;

  constructor(private router: Router) { }

  ngOnInit() {}
  
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}

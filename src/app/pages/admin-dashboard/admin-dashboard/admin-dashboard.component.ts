import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/servicess/auth-service/auth.service';
import { PropertyService } from 'src/app/servicess/property-service/property.service';
import { CalendarService } from 'src/app/servicess/calendar-service/calendar.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AdminDashboardComponent  implements OnInit {
  totalUsers = 0;
  totalProperties = 0;
  totalBookings = 0;
  totalEarnings = 0;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private propertyService: PropertyService,
    private calendarService: CalendarService  
  ) { }

  ngOnInit() {
    this.loadUserCount();
    this.loadPropertyCount();
    this.loadTotalBookings();
    this.loadTotalEarnings();
  }
  
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

   loadUserCount() {
    this.authService.getUserCount().subscribe({
      next: (count: number) => {
        this.totalUsers = count;
      },
      error: (err) => {
        console.error('Failed to fetch user count', err);
      }
    });
  }

    loadPropertyCount() {
    this.propertyService.countAllProperties().subscribe({
      next: (count: number) => {
        this.totalProperties = count;
      },
      error: (err) => {
        console.error('Failed to fetch property count', err);
      }
    });
  }

  loadTotalBookings() {
    this.calendarService.getTotalBookedSlots().subscribe({
      next: (count: number) => this.totalBookings = count,
      error: (err) => console.error('Failed to fetch total bookings', err)
    });
  }

  loadTotalEarnings() {
  this.calendarService.getTotalEarnings().subscribe({
    next: (total: number) => {
      this.totalEarnings = total;
    },
    error: (err) => {
      console.error('Failed to fetch total earnings', err);
    }
  });
}


}

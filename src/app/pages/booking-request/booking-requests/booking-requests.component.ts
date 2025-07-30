import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/Booking';
import { BookingService } from '../../../servicess/booking-service/booking.service';


@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class BookingRequestsComponent  implements OnInit {
  selectedTab: string = 'upcoming';
  bookings: Booking[] = [];

  constructor(
    private navCtrl: NavController,
    private router:Router,
    private bookingService:BookingService
  ) { }

  ngOnInit() {
    this.loadLandlordBookings();
  }

  loadLandlordBookings() {
    const user = localStorage.getItem('user');
    if (user) {
      const landlordId = Number(user);
      this.bookingService.getBookingsByLandlordId(landlordId).subscribe({
        next: (data) => {
          this.bookings = data.map(booking => {
            return {
              ...booking,
              type: booking.status === 'approved' || booking.status === 'rejected' ? 'past' : 'upcoming',
              image: booking.imageUrl || 'assets/default-placeholder.jpg'
            };
          });
        },
        error: (err) => {
          console.error('Error fetching bookings:', err);
        }
      });
    }
  }

  filteredBookings() {
    return this.bookings.filter(b => b.type === this.selectedTab);
  }

  approveBooking(booking: any) {
    booking.status = 'approved';
  }

  rejectBooking(booking: any) {
    booking.status = 'rejected';
  }

  viewBooking(booking: any) {
    this.router.navigateByUrl('/landlord-view-booking', {state: {booking}});
    console.log('Viewing booking:', booking);
  }

  goBack(){
    this.navCtrl.back();
  }

}

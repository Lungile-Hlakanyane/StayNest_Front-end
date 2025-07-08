import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class BookingRequestsComponent  implements OnInit {
  
  selectedTab: string = 'upcoming';

  constructor(
    private navCtrl: NavController,
    private router:Router
  ) { }

  ngOnInit() {}

   bookings = [
    {
      name: 'Loft Apartment',
      location: 'Sandton',
      checkIn: '2025-07-20',
      checkOut: '2025-07-25',
      status: 'pending',
      image: 'assets/accomodation_01.jpeg',
      type: 'upcoming'
    },
    {
      name: 'Beach Villa',
      location: 'Cape Town',
      checkIn: '2025-06-10',
      checkOut: '2025-06-15',
      status: 'approved',
      image: 'assets/accomodation_01.jpeg',
      type: 'past'
    },
    {
      name: 'Modern Suite',
      location: 'Durban',
      checkIn: '2025-07-28',
      checkOut: '2025-08-02',
      status: 'pending',
      image: 'assets/accomodation_01.jpeg',
      type: 'upcoming'
    }
  ];

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
    this.router.navigateByUrl('/landlord-view-booking');
    console.log('Viewing booking:', booking);
  }

  goBack(){
    this.navCtrl.back();
  }

}

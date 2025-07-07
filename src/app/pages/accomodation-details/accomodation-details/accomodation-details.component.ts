import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accomodation-details',
  templateUrl: './accomodation-details.component.html',
  styleUrls: ['./accomodation-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AccomodationDetailsComponent  implements OnInit {

   accommodation: any;

  constructor(private route: ActivatedRoute, private router:Router) {
    this.accommodation = {
      id: 1,
      name: 'GreenVilla Lodge',
      price: 650,
      images: [
        'assets/accomodation_01.jpeg',
        'assets/accomodation_02.jpeg',
        'assets/accomodation_03.jpeg'
      ],
      description: 'A peaceful lodge perfect for family getaways and cozy weekends.',
      amenities: ['Wi-Fi', 'Swimming Pool', 'Parking', 'Kitchenette'],
      landlord: {
        name: 'Lungile H.',
        contact: '083 456 7890'
      }
    };
  }

  ngOnInit() {
  }

  bookNow() {
    this.router.navigate(['/book'], { state: { accommodation: this.accommodation } });
    console.log('Booking:', this.accommodation);
  }

  addToFavorites() {
    console.log('Added to favorites:', this.accommodation.id);
  }

}

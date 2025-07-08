import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-landlord-view-accomodation',
  templateUrl: './landlord-view-accomodation.component.html',
  styleUrls: ['./landlord-view-accomodation.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class LandlordViewAccomodationComponent  implements OnInit {

  accommodation: any;

  constructor(
    private route: ActivatedRoute, 
    private router:Router, 
    private navCtrl: NavController,
    private toastController: ToastController,
  ) { 
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
        contact: '083 456 7890',
        email: 'info@greenvilla.co.za'
      }
    };
  }

  ngOnInit() {}

  editAccomodation() {
    this.router.navigate(['/edit-accomodation']);
  }

  async deleteAccomodation() {
    const toast = await this.toastController.create({
      message: 'Accommodation deleted',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }

  goBack(){
    this.navCtrl.back();
  }

}

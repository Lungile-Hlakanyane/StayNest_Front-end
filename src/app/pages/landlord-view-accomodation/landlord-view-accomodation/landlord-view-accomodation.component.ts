import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { PropertyService } from 'src/app/servicess/property-service/property.service';

@Component({
  selector: 'app-landlord-view-accomodation',
  templateUrl: './landlord-view-accomodation.component.html',
  styleUrls: ['./landlord-view-accomodation.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class LandlordViewAccomodationComponent  implements OnInit {

  accommodation!: any;
  accomodation: any;

  constructor(
    private route: ActivatedRoute, 
    private router:Router, 
    private navCtrl: NavController,
    private toastController: ToastController,
    private propertyService:PropertyService
  ) { 
     
  }

  ngOnInit() {
    this.loadPropertyById();
  }

  editProperty(propertyId: number) {
    this.router.navigate(['edit-accomodation', propertyId]);
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

  async loadPropertyById(){
     const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
    this.fetchPropertyById(+propertyId);
   }
  }

  fetchPropertyById(id: number) {
  this.propertyService.getPropertyById(id).subscribe({
    next: (data) => {
      this.accommodation = data;
    },
    error: (err) => {
      console.error('Error fetching property:', err);
    }
  });
}

}

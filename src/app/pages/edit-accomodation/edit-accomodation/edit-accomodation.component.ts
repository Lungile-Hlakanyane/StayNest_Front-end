import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/servicess/property-service/property.service';


@Component({
  selector: 'app-edit-accomodation',
  templateUrl: './edit-accomodation.component.html',
  styleUrls: ['./edit-accomodation.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class EditAccomodationComponent  implements OnInit {

   propertyId!: number;

   property: {
      name: string;
      location: string;
      price: number | null;
      description: string;
      image: any;
      phoneNumber?: string;
      email?: string;
    } = {
      name: '',
      location: '',
      price: null,
      description: '',
      image: null
    };
  
    availableAmenities = [
    { name: 'WiFi', selected: false },
    { name: 'Breakfast', selected: false },
    { name: 'Swimming Pool', selected: false },
    { name: 'Gym', selected: false },
    { name: 'Spa', selected: false },
    { name: 'On-Site Restaurant', selected: false }
  ];
  
  imagePreview: string | ArrayBuffer | null = null;
  
    constructor(
      private toastController: ToastController, 
      private navCtrl: NavController,
      private propertyService:PropertyService,
      private route:ActivatedRoute
    )
    { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
     const id = params.get('id');
       if (id) {
      this.propertyId = +id;
      this.loadPropertyById(this.propertyId);
     }
     });
  }
  
    onImageSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.property.image = file;
  
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  
   async submitProperty() {
  const selectedAmenities = this.availableAmenities
    .filter(a => a.selected)
    .map(a => a.name);

  const formData = new FormData();
  const propertyPayload = {
    name: this.property.name,
    location: this.property.location,
    price: this.property.price,
    description: this.property.description,
    amenities: selectedAmenities,
    phoneNumber: this.property.phoneNumber,
    email: this.property.email
  };

  formData.append('property', new Blob([JSON.stringify(propertyPayload)], { type: 'application/json' }));
  if (this.property.image) {
    formData.append('image', this.property.image);
  }

  this.propertyService.updateProperty(this.propertyId, formData).subscribe({
    next: async () => {
      const toast = await this.toastController.create({
        message: 'Property updated successfully!',
        duration: 3000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      this.navCtrl.navigateBack('/my-properties');
    },
    error: async (err) => {
      console.error('Update failed', err);
      const toast = await this.toastController.create({
        message: 'Update failed!',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  });
}


  
  goBack(){
      this.navCtrl.back();
  }

  loadPropertyById(id: number) {
  this.propertyService.getPropertyById(id).subscribe({
    next: (data) => {
      this.property = {
        name: data.name,
        location: data.location,
        price: data.price,
        description: data.description,
        image: null,
        phoneNumber: data.phoneNumber,
        email: data.email
      };

      this.availableAmenities.forEach(a => {
        a.selected = data.amenities.includes(a.name);
      });

      if (data.image) {
        this.imagePreview = 'data:image/jpeg;base64,' + data.image;
      }
    },
    error: (err) => {
      console.error('Failed to load property:', err);
    }
  });
}
  

}

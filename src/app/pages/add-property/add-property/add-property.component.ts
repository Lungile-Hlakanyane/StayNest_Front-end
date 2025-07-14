import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { PropertyService } from 'src/app/servicess/property-service/property.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AddPropertyComponent  implements OnInit {
  
  property = {
    name: '',
    location: '',
    price: null,
    description: '',
    image: null,
    email: '',
    phoneNumber: ''
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
    private propertyService:PropertyService,
    private toastController: ToastController, 
    private navCtrl: NavController)
  { }

  ngOnInit() {}

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

  const userId = localStorage.getItem('user'); // or however you're storing the logged-in user ID
  const propertyData = {
    name: this.property.name,
    location: this.property.location,
    price: this.property.price,
    description: this.property.description,
    email: this.property.email,
    phoneNumber: this.property.phoneNumber,
    amenities: selectedAmenities,
    userId: userId ? Number(userId) : null
  };

  formData.append('property', new Blob([JSON.stringify(propertyData)], { type: 'application/json' }));

  if (this.property.image) {
    formData.append('image', this.property.image);
  }

  this.propertyService.addProperty(formData).subscribe({
    next: async () => {
      const toast = await this.toastController.create({
        message: 'Property added successfully!',
        duration: 3000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      this.navCtrl.navigateBack('/my-properties');
    },
    error: async (err) => {
      const toast = await this.toastController.create({
        message: 'Failed to add property.',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
      console.error(err);
    }
  });
}



  goBack(){
    this.navCtrl.back();
  }


}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';

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
  const fullPropertyData = {
    ...this.property,
    amenities: selectedAmenities
  };
  console.log('Property submitted:', fullPropertyData);
  const toast = await this.toastController.create({
    message: 'Property added successfully!',
    duration: 3000,
    color: 'success',
    position: 'top'
  });
  await toast.present();
  this.navCtrl.navigateBack('/my-properties');
}


  goBack(){
    this.navCtrl.back();
  }


}

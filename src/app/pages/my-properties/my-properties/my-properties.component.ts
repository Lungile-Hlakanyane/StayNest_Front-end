import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Property } from 'src/app/models/Property';
import { PropertyService } from 'src/app/servicess/property-service/property.service';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class MyPropertiesComponent  implements OnInit {

 properties: Property[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private propertyService:PropertyService,
    private alertController:AlertController,
    private toastController:ToastController
  ) { }

  ngOnInit() {
    this.loadPropertyByUser();
  }

  editProperty(propertyId: number) {
    this.router.navigate(['edit-accomodation', propertyId]);
  }

  viewAccomodation(propertyId: number){
    this.router.navigate(['landlord-view-accomodation', propertyId]);
  }

async deleteProperty(property: any) {
  const alert = await this.alertController.create({
    header: 'Delete Property',
    message: `Are you sure you want to delete "${property.name}"?`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          this.propertyService.deleteProperty(property.id).subscribe({
            next: async () => {
              this.properties = this.properties.filter(p => p.id !== property.id);
              
              const toast = await this.toastController.create({
                message: `"${property.name}" deleted successfully.`,
                duration: 2000,
                color: 'success',
                position: 'top'
              });
              await toast.present();
            },
            error: async (err) => {
              const toast = await this.toastController.create({
                message: `Failed to delete property.`,
                duration: 2000,
                color: 'danger',
                position: 'top'
              });
              await toast.present();
              console.error('Error deleting property:', err);
            }
          });
        }
      }
    ]
  });
  await alert.present();
}


  navigate(link: string) {
    this.router.navigate([link]); 
  }

  goBack(){
    this.navCtrl.back();
  }

  loadPropertyByUser(){
    const userId = Number(localStorage.getItem('user'));
    if (userId) {
      this.propertyService.getPropertiesByUserId(userId).subscribe({
        next: (data) => {
          this.properties = data.map(p => ({
            ...p,
            image: p.image ? `data:image/jpeg;base64,${p.image}` : 'assets/images/placeholder.jpg'
          }));
        },
        error: (err) => console.error('Failed to fetch properties', err)
      });
    }
  }

}

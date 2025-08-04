import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';
import { PropertyService } from '../../../servicess/property-service/property.service';


@Component({
  selector: 'app-admin-view-property',
  templateUrl: './admin-view-property.component.html',
  styleUrls: ['./admin-view-property.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AdminViewPropertyComponent  implements OnInit {

  accommodation: any;

  constructor(
    private route: ActivatedRoute, 
    private router:Router, 
    private navCtrl: NavController,
    private toastController: ToastController,
    private propertyService: PropertyService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.fetchPropertyDetails();
  }

  editAccomodation() {
    this.router.navigate(['/edit-accomodation']);
  }

 async deleteAccomodation() {
  const alert = await this.alertController.create({
    header: 'Confirm Deletion',
    message: 'Are you sure you want to delete this accommodation?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          this.performDelete();
        }
      }
    ]
  });
  await alert.present();
}

  goBack(){
    this.navCtrl.back();
  }

  fetchPropertyDetails(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.propertyService.getPropertyById(id).subscribe({
        next: (res) => {
          this.accommodation = {
            ...res,
            images: [`data:image/jpeg;base64,${res.image}`],
            landlord: {
              name: res.email,
              contact: res.phoneNumber,
              email: res.email
            }
          };
        },
        error: (err) => {
          console.error('Failed to fetch property', err);
        }
      });
    }
  }

  private async performDelete() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (!id) return;

  this.propertyService.deleteProperty(id).subscribe({
    next: async () => {
      const toast = await this.toastController.create({
        message: 'Accommodation deleted successfully',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
      this.navCtrl.back(); 
    },
    error: async (error) => {
      console.error('Failed to delete accommodation', error);
      const toast = await this.toastController.create({
        message: 'Failed to delete accommodation',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  });
}

}

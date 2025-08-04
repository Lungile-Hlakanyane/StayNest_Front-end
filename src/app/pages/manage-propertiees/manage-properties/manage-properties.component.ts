import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/servicess/property-service/property.service';

@Component({
  selector: 'app-manage-properties',
  templateUrl: './manage-properties.component.html',
  styleUrls: ['./manage-properties.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class ManagePropertiesComponent  implements OnInit {
  searchText = '';
  properties: any[] = [];

  constructor(
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController,
    private router: Router,
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.fetchProperties();
  }

  filteredProperties() {
    return this.properties.filter((p) =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

 viewProperty(id: number) {
   this.router.navigate(['/admin-view-property', id]);
 }


async blockProperty(property: any) {
  const alert = await this.alertCtrl.create({
    header: 'Block Property',
    message: `Are you sure you want to block "${property.name}"?`,
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Yes',
        handler: async () => {
          this.propertyService.blockProperty(property.id).subscribe({
            next: async () => {
              property.blocked = true; // update locally if needed
              const toast = await this.toastCtrl.create({
                message: `${property.name} has been blocked.`,
                duration: 3000,
                color: 'success',
                position: 'top',
              });
              await toast.present();
            },
            error: async (err) => {
              const toast = await this.toastCtrl.create({
                message: `Failed to block ${property.name}.`,
                duration: 3000,
                color: 'danger',
                position: 'top',
              });
              await toast.present();
              console.error(err);
            }
          });
        },
      },
    ],
  });
  await alert.present();
}


  async deleteProperty(property: any) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Property',
      message: `Are you sure you want to delete "${property.name}"? This action is irreversible.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: async () => {
            this.properties = this.properties.filter((p) => p !== property);
            const toast = await this.toastCtrl.create({
              message: `${property.name} has been deleted.`,
              duration: 3000,
              color: 'medium',
              position: 'top',
            });
            await toast.present();
          },
        },
      ],
    });
    await alert.present();
  }

  goBack() {
    history.back();
  }

  
  fetchProperties() {
    this.propertyService.getAllProperties().subscribe({
      next: (data) => {
        this.properties = data;
      },
      error: (err) => {
        console.error('Failed to fetch properties', err);
      }
    });
  }

getImageSrc(imageData: string): string {
  return `data:image/jpeg;base64,${imageData}`;
}

async toggleBlockStatus(property: any) {
  const action = property.blocked ? 'unblock' : 'block';
  const alert = await this.alertCtrl.create({
    header: `${action.charAt(0).toUpperCase() + action.slice(1)} Property`,
    message: `Are you sure you want to ${action} "${property.name}"?`,
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Yes',
        handler: async () => {
          const request = property.blocked
            ? this.propertyService.unblockProperty(property.id)
            : this.propertyService.blockProperty(property.id);

          request.subscribe({
            next: async () => {
              property.blocked = !property.blocked; // Toggle the flag locally
              const toast = await this.toastCtrl.create({
                message: `${property.name} has been ${action}ed.`,
                duration: 3000,
                color: property.blocked ? 'danger' : 'success',
                position: 'top',
              });
              await toast.present();
            },
            error: async (err) => {
              const toast = await this.toastCtrl.create({
                message: `Failed to ${action} ${property.name}.`,
                duration: 3000,
                color: 'danger',
                position: 'top',
              });
              await toast.present();
              console.error(err);
            }
          });
        }
      }
    ]
  });
  await alert.present();
}



}

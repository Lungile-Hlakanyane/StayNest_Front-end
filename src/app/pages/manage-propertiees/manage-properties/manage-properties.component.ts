import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-properties',
  templateUrl: './manage-properties.component.html',
  styleUrls: ['./manage-properties.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class ManagePropertiesComponent  implements OnInit {
  searchText = '';
  properties = [
    {
      name: 'Rosewood Apartments',
      image: '../../../../assets/accomodation_01.jpeg',
      location: 'Cape Town, SA',
      owner: 'Lungile H.',
      status: 'active',
    },
    {
      name: 'Urban Stay Villa',
      image: '../../../../assets/accomodation_02.jpeg',
      location: 'Sandton, Johannesburg',
      owner: 'Nomvula S.',
      status: 'blocked',
    },
    // Add more mocked properties as needed
  ];

  constructor(
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {}

  filteredProperties() {
    return this.properties.filter((p) =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  viewProperty() {
   this.router.navigateByUrl('/admin-view-property');
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
            property.status = 'blocked';
            const toast = await this.toastCtrl.create({
              message: `${property.name} has been blocked.`,
              duration: 3000,
              color: 'danger',
              position: 'top',
            });
            await toast.present();
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

}

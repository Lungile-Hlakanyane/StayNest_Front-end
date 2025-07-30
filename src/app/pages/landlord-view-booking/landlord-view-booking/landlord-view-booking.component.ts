import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController, ToastController,ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../servicess/auth-service/auth.service';
import { UserDTO } from 'src/app/models/UserDTO';
import { PropertyService } from '../../../servicess/property-service/property.service';
import { Property } from 'src/app/models/Property';


@Component({
  selector: 'app-landlord-view-booking',
  templateUrl: './landlord-view-booking.component.html',
  styleUrls: ['./landlord-view-booking.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class LandlordViewBookingComponent  implements OnInit {

  booking: any;
  tenant: UserDTO | null = null;
  propertyPrice: number | null = null;
  propertyDescription: string | null = null;

  constructor(
    private navCtrl: NavController,
    private alertController:AlertController,
    private toastController:ToastController,
    private router:Router,
    private actionSheetController:ActionSheetController,
    private authService:AuthService,
    private propertyService:PropertyService
  ) { }

  ngOnInit() {
   this.loadFetchedData();
  }

  goBack(){
    this.navCtrl.back();
  }

 async checkInVisitor() {
  const alert = await this.alertController.create({
    header: 'Confirm Check-In',
    message: 'You are about to Check In this visitor?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'alert-button-cancel'
      },
      {
        text: 'Yes',
        handler: async () => {
          const toast = await this.toastController.create({
            message: 'You have checked in this user...',
            duration: 3000,
            color: 'success',
            position: 'top'
          });

          await toast.present();
        }
      }
    ]
  });

  await alert.present();
}


navigateToChat() {
  this.router.navigateByUrl('/chat');
}

async presentInvoiceActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Invoice Options',
      buttons: [
        {
          text: 'Download Invoice',
          icon: 'download',
          handler: () => {
            console.log('Download Invoice clicked');
          },
        },
        {
          text: 'View Invoice',
          icon: 'eye',
          handler: () => {
            console.log('View Invoice clicked');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

loadFetchedData() {
  const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras?.state && navigation.extras.state['booking']) {
    this.booking = navigation.extras.state['booking'];
    console.log('Received booking data:', this.booking);

    const tenantId = this.booking.bookedById;
    this.authService.getUserById(tenantId).subscribe({
      next: (data) => {
        this.tenant = data;
        console.log('Tenant data:', this.tenant);
      },
      error: (err) => {
        console.error('Failed to fetch tenant data', err);
      }
    });

    const propertyId = this.booking.propertyId;
    this.propertyService.getPropertyById(propertyId).subscribe({
      next: (property: any) => {
        this.propertyPrice = property.price;
        this.propertyDescription = property.description;
        console.log('Property price:', this.propertyPrice);
        console.log('Property description:', this.propertyDescription);
      },
      error: (err) => {
        console.error('Failed to fetch property data:', err);
      }
    });

  } else {
    console.warn('No booking data received.');
    this.navCtrl.back();
  }
}



}

import { Component } from '@angular/core';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  constructor(
     private alertCtrl: AlertController,
     private loadingCtrl: LoadingController,
     private menuCtrl: MenuController,
     private router: Router
  ) {}

  user = {
  name: 'Lungile Hlakanyane',
  email: 'lungile@example.com',
  phone: '+27 65 123 4567',
 };


 async confirmLogout() {
  const alert = await this.alertCtrl.create({
    header: 'Confirm Logout',
    message: 'Are you sure you want to exit?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Yes',
        handler: () => this.performLogout()
      }
    ]
  });

  await alert.present();
}

async performLogout() {
  await this.menuCtrl.close();
  const loading = await this.loadingCtrl.create({
    message: 'Logging out...',
    duration: 2000,
    spinner: 'crescent',
    cssClass: 'custom-logout-spinner'
  });

  await loading.present();
  setTimeout(async () => {
    await loading.dismiss();
    this.router.navigate(['/login']);
  }, 2000);
}

}

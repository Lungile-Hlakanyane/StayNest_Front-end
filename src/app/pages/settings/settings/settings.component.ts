import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class SettingsComponent  implements OnInit {
  notificationsEnabled: boolean = true;
  selectedLanguage: string = 'en';

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router:Router
  ) { }

  ngOnInit() {}

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Account',
      message: 'This action is irreversible. Are you sure you want to delete your account?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Account deleted');
          }
        }
      ]
    });

    await alert.present();
  }

  openPolicy(type: 'privacy' | 'terms') {
    const url = type === 'privacy'
      ? 'https://yourdomain.com/privacy-policy'
      : 'https://yourdomain.com/terms';
    window.open(url, '_blank');
  }

  goBack(){
    this.navCtrl.back();
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }


}

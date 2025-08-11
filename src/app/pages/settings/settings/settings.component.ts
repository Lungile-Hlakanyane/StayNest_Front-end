import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicess/auth-service/auth.service';

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
    private router:Router,
    private userService: AuthService
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
          const userId = Number(localStorage.getItem('user'));
          if (!userId) {
            console.error('No logged-in user found');
            return;
          }
          this.userService.deleteUser(userId).subscribe({
            next: () => {
              localStorage.clear(); 
              this.router.navigateByUrl('/login');
            },
            error: (err) => {
              console.error('Error deleting account', err);
            }
          });
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

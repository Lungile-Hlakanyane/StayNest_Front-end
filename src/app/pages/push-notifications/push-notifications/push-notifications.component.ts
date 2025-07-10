import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class PushNotificationsComponent  implements OnInit {

   newAnnouncement = {
    title: '',
    message: ''
  };

  announcements = [
    { title: 'System Update', message: 'Maintenance tonight from 11PM.', date: '2025-07-10' },
    { title: 'New Features', message: 'Analytics Dashboard has been added!', date: '2025-07-01' }
  ];

  constructor(
    private toastCtrl: ToastController, 
    private navCtrl: NavController
  ) {}

  async sendAnnouncement() {
    if (!this.newAnnouncement.title || !this.newAnnouncement.message) return;

    this.announcements.unshift({
      title: this.newAnnouncement.title,
      message: this.newAnnouncement.message,
      date: new Date().toISOString().split('T')[0]
    });

    this.newAnnouncement = { title: '', message: '' };

    const toast = await this.toastCtrl.create({
      message: 'Announcement sent to all users!',
      duration: 2000,
      color: 'success',
      position: 'top'
    });

    toast.present();
  }

  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {}

}

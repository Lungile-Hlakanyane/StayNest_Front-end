import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController, ToastController } from '@ionic/angular';
import { AnnouncementService } from 'src/app/servicess/announcement-service/announcement.service';
import { Announcement } from 'src/app/models/Announcement';

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
    message: '',
    recipient: ''
  };

 announcements: Announcement[] = [];

  constructor(
    private toastCtrl: ToastController, 
    private navCtrl: NavController,
    private announcementService: AnnouncementService
  ) {}

async sendAnnouncement() {
  const { title, message, recipient } = this.newAnnouncement;
  if (!title || !message || !recipient) return;
  this.announcementService.sendAnnouncement({ title, message, recipient}).subscribe({
    next: async (response) => {
      this.announcements.unshift(response);
      this.newAnnouncement = { title: '', message: '', recipient: '' };
      const toast = await this.toastCtrl.create({
        message: 'Announcement sent!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
    },
    error: async (err) => {
      const toast = await this.toastCtrl.create({
        message: 'Failed to send announcement',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
    }
  });
}


  goBack() {
    this.navCtrl.back();
  }

  fetAllAnnouncements() {
     this.announcementService.fetchAnnouncements().subscribe((data) => {
      this.announcements = data.sort((a, b) => b.date.localeCompare(a.date));
    });
  }

  ngOnInit() {
    this.fetAllAnnouncements();
  }

}

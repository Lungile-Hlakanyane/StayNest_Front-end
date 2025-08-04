import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AnnouncementService } from 'src/app/servicess/announcement-service/announcement.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class UpdatesComponent  implements OnInit {

  announcements: any[] = [];

  constructor(
    private announcementService: AnnouncementService,
    private navCtrl: NavController
  ) { }

  goBack(){
    this.navCtrl.back();
  }

  ngOnInit() {
    this.fetchAnnouncements();
  }

 fetchAnnouncements() {
  const userRole = localStorage.getItem('role')?.toUpperCase();
  if (!userRole) {
    console.warn('No user role found in localStorage');
    return;
  }
  this.announcementService.fetchAnnouncements().subscribe({
    next: (data) => {
      this.announcements = data.filter(
        (announcement: any) => 
          announcement.recipient === userRole || announcement.recipient === 'ALL'
      );
    },
    error: (err) => {
      console.error('Error fetching announcements', err);
    }
  });
}


}

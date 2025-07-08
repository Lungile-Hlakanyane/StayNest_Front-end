import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class NotificationsComponent  implements OnInit {

  recentChats = [
    {
      landlord: 'John Mokoena',
      message: 'Your check-in is confirmed for tomorrow!',
      time: '09:45 AM',
      avatar: 'assets/profile-pic-image.jpg',
      bookingId: 101
    },
    {
      landlord: 'Sarah Ndlovu',
      message: 'Let me know if you need help with WiFi setup.',
      time: 'Yesterday',
      avatar: 'assets/profile-pic-image.jpg',
      bookingId: 102
    },
    {
      landlord: 'Michael Khumalo',
      message: 'Thanks for choosing our place. Enjoy!',
      time: '2 days ago',
      avatar: 'assets/profile-pic-image.jpg',
      bookingId: 103
    }
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

   openChat(chat: any) {
    this.navCtrl.navigateForward(`/chat`);
  }

  goBack(){
    this.navCtrl.back();
  }

}

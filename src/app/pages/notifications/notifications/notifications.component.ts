import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { Message } from 'src/app/models/Message';
import { MessageDTO } from 'src/app/models/MessageDTO';
import { MessageService } from 'src/app/servicess/message-service/message.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class NotificationsComponent  implements OnInit {

  recentChats: any[] = [];

  constructor(
    private navCtrl: NavController,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.fetchUserNotifications();
  }

openChat(chat: any) {
  this.navCtrl.navigateForward(['/chat'], {
    state: { receiverId: chat.senderId } // 👈 correct field
  });
}



  goBack(){
    this.navCtrl.back();
  }

  fetchUserNotifications(){
    const userId = localStorage.getItem('user');
    if (userId) {
      const receiverId = Number(userId);
      this.messageService.getMessagesForReceiver(receiverId).subscribe({
        next: (messages: Message[]) => {
          this.recentChats = messages.map((msg) => ({
            landlord: `Landlord ID: ${msg.senderId}`, // You can fetch name if needed
            message: msg.content,
            time: new Date(msg.timestamp).toLocaleString(),
            avatar: 'assets/profile-pic-image.jpg',
            senderId: msg.senderId
          }));
        },
        error: (err) => {
          console.error('Failed to load messages for receiver:', err);
        }
      });
    }
  }

}

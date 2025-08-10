import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { Message } from 'src/app/models/Message';
import { MessageDTO } from 'src/app/models/MessageDTO';
import { MessageService } from 'src/app/servicess/message-service/message.service';
import { PropertyService } from 'src/app/servicess/property-service/property.service';
import { AuthService } from 'src/app/servicess/auth-service/auth.service';

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
    private messageService: MessageService,
    private propertyService: PropertyService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.fetchUserNotifications();
  }

openChat(chat: any) {
  this.navCtrl.navigateForward(['/chat'], {
    state: {
  receiverId: chat.senderId,
  propertyName: chat.propertyName,
  propertyEmail: chat.propertyEmail,
  propertyPhone: chat.propertyPhone,
  propertyLocation: chat.propertyLocation,
  landlordName: chat.landlordName
}
  });
}

  goBack(){
    this.navCtrl.back();
  }

 fetchUserNotifications() {
  const userId = localStorage.getItem('user');
  if (!userId) return;

  const receiverId = Number(userId);

  Promise.all([
    this.messageService.getMessagesForReceiver(receiverId).toPromise(),
    this.propertyService.getAllProperties().toPromise(),
    this.authService.getAllUsers().toPromise(),
    this.authService.getCurrentUser().toPromise() // 👈 Get the logged-in user
  ])
    .then(([messages, properties, users, currentUser]) => {
      const msgs = messages ?? [];
      const props = properties ?? [];
      const usrs = users ?? [];

      const isLandlord = currentUser?.role === 'landlord';

      this.recentChats = msgs.map((msg) => {
        const otherUser = usrs.find(u => u.id === msg.senderId); // 👈 This is the other party in chat
        const property = props.find(p => p.userId === (isLandlord ? receiverId : msg.senderId));

        return {
          propertyName: isLandlord 
            ? otherUser?.fullName || 'Unknown Tenant' 
            : property?.name || 'Unknown Property',
          propertyEmail: property?.email || 'Unknown Email',
          propertyPhone: property?.phoneNumber || 'Unknown Phone',
          propertyLocation: property?.location || 'Unknown Location',
          landlordName: isLandlord 
            ? currentUser.fullName 
            : otherUser?.fullName || 'Unknown Landlord',
          message: msg.content,
          time: new Date(msg.timestamp).toLocaleString(),
          avatar: 'assets/profile-pic-image.jpg',
          senderId: msg.senderId
        };
      });
    })
    .catch((err) => {
      console.error('Failed to load notifications:', err);
    });
}




}

import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/servicess/message-service/message.service';
import { MessageDTO } from 'src/app/models/MessageDTO';
import { Message } from 'src/app/models/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class ChatComponent  implements OnInit {

  messages: Message[] = [];
  newMessage = '';
  receiverId: number | null = null;
  loggedInUserId!: number;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private location: Location,
    private messageService:MessageService
  ) { }

  ngOnInit() {
    const state = this.location.getState() as { receiverId?: number };
    if (state?.receiverId) {
      this.receiverId = state.receiverId;
    } else {
      this.navCtrl.back();
      return;
    }
    const storedUserId = localStorage.getItem('user');
    if (storedUserId) {
      this.loggedInUserId = Number(storedUserId);
    } else {
      console.warn('User not found in localStorage');
      return;
    }

    this.loadChatHistory();
  }


  goBack(){
    this.navCtrl.back();
  }

 loadChatHistory() {
    if (!this.loggedInUserId || !this.receiverId) return;
    this.messageService.getChatHistory(this.loggedInUserId, this.receiverId).subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: (err) => {
        console.error('Failed to load chat history', err);
      }
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const msgDto: MessageDTO = {
      senderId: this.loggedInUserId,
      receiverId: this.receiverId!,
      content: this.newMessage.trim(),
    };

    this.messageService.sendMessage(msgDto).subscribe({
      next: (savedMessage) => {
        const newMsg: Message = {
          id: savedMessage.id,
          senderId: this.loggedInUserId,
          receiverId: this.receiverId!,
          content: savedMessage.content,
          timestamp: new Date().toISOString()
        };
        this.messages.push(newMsg);
        this.newMessage = '';
      },
      error: (err) => {
        console.error('Failed to send message', err);
      }
    });
  }

}

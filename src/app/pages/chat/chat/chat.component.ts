import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class ChatComponent  implements OnInit {

  messages = [
    { text: 'Hello! Welcome to StayNest 😊', time: '10:00 AM', fromUser: false },
    { text: 'Thanks! Looking forward to my stay.', time: '10:02 AM', fromUser: true }
  ];

  newMessage = '';

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  sendMessage() {
    if (this.newMessage.trim()) {
      const newMsg = {
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fromUser: true,
      };
      this.messages.push(newMsg);
      this.newMessage = '';
    }
  }

  goBack(){
    this.navCtrl.back();
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin-support-ticket',
  templateUrl: './admin-support-ticket.component.html',
  styleUrls: ['./admin-support-ticket.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AdminSupportTicketComponent  implements OnInit {

   searchTerm = '';

  tickets = [
    {
      title: 'Wi-Fi not working',
      userName: 'Lerato Mokoena',
      role: 'Tenant',
      description: 'Internet has been down since yesterday.',
      status: 'pending',
      priority: 'High'
    },
    {
      title: 'Leaking Pipe',
      userName: 'Thabo Mkhize',
      role: 'Landlord',
      description: 'Pipe under kitchen sink is leaking.',
      status: 'assigned',
      priority: 'Medium'
    },
    {
      title: 'Access Card Lost',
      userName: 'Nadia Jacobs',
      role: 'Tenant',
      description: 'I lost my access card. Need a replacement.',
      status: 'resolved',
      priority: 'Low'
    }
  ];

  constructor(private toastCtrl: ToastController) {}

  ngOnInit() {}

   goBack() {
    history.back();
  }

  filteredTickets() {
    if (!this.searchTerm) return this.tickets;
    return this.tickets.filter(t =>
      t.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      t.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async assignTicket(ticket: any) {
    ticket.status = 'assigned';
    const toast = await this.toastCtrl.create({
      message: 'Ticket has been assigned.',
      duration: 2500,
      color: 'primary',
      position: 'top'
    });
    await toast.present();
  }

  async resolveTicket(ticket: any) {
    ticket.status = 'resolved';
    const toast = await this.toastCtrl.create({
      message: 'Ticket marked as resolved.',
      duration: 2500,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }

  async escalateTicket(ticket: any) {
    ticket.status = 'escalated';
    const toast = await this.toastCtrl.create({
      message: 'Ticket escalated to admin support.',
      duration: 2500,
      color: 'warning',
      position: 'top'
    });
    await toast.present();
  }

}

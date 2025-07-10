import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin-payments-transactions',
  templateUrl: './admin-payments-transactions.component.html',
  styleUrls: ['./admin-payments-transactions.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class AdminPaymentsTransactionsComponent  implements OnInit {

 
  transactions = [
    {
      id: '#TXN1023',
      landlord: 'Michael Smith',
      amount: 4200,
      date: '2025-07-06',
      status: 'Completed'
    },
    {
      id: '#TXN1024',
      landlord: 'Sarah Johnson',
      amount: 3600,
      date: '2025-07-05',
      status: 'Pending'
    },
    {
      id: '#TXN1025',
      landlord: 'Brian Miles',
      amount: 5000,
      date: '2025-07-04',
      status: 'Failed'
    }
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }

  handleDispute(transaction: any) {
    console.log('Handling dispute for:', transaction.id);
  }

}

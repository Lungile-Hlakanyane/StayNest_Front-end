import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-help-faq',
  templateUrl: './help-faq.component.html',
  styleUrls: ['./help-faq.component.scss'],
   standalone: true,
    imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class HelpFaqComponent  implements OnInit {

    faqs = [
    {
      question: 'How do I add a new property?',
      answer: 'Navigate to the Dashboard > My Properties > Add New Property. Fill in the form and submit.'
    },
    {
      question: 'When will I receive my payouts?',
      answer: 'Payouts are processed weekly. You can view your payout history under the Payout Settings screen.'
    },
    {
      question: 'How do I approve a booking?',
      answer: 'Go to Bookings & Requests, select the booking, and tap "Approve".'
    },
    {
      question: 'How can I contact a tenant?',
      answer: 'Use the Chat option under the Tenant List or Booking Details screen to reach out to tenants.'
    },
    {
      question: 'Can I block a tenant?',
      answer: 'Yes, visit the Tenant Profile screen and click on "Block Tenant" at the bottom.'
    }
  ];

  constructor(
    private router:Router,
    private actionSheetController:ActionSheetController
  ) { }

  goBack() {
    this.router.navigate(['/settings']);
  }

  async contactSupport() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Contact Support',
    subHeader: 'Choose an option',
    buttons: [
      {
        text: 'Call Support (012 345 6789)',
        icon: 'call-outline',
        handler: () => {
          window.open('tel:0123456789', '_system');
        }
      },
      {
        text: 'Call Backup Support (011 222 3344)',
        icon: 'call-outline',
        handler: () => {
          window.open('tel:0112223344', '_system');
        }
      },
      {
        text: 'Email Support (support@staynest.co.za)',
        icon: 'mail-outline',
        handler: () => {
          window.open('mailto:support@staynest.co.za', '_system');
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }
    ]
  });

  await actionSheet.present();
}

  ngOnInit() {}

}

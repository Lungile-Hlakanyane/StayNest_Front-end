import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-report-reasons-modal',
  templateUrl: './report-reasons-modal.component.html',
  styleUrls: ['./report-reasons-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class ReportReasonsModalComponent  implements OnInit {
  @Input() tenantId!: number;

  selectedReason: string = '';
  
  reportReasons: string[] = [
    'Noise complaints',
    'Damaged property',
    'Unauthorized guests',
    'Violation of rules',
    'Late payment',
    'Other'
  ];

  constructor(
    private modalController:ModalController
  ) { }

   dismiss() {
    this.modalController.dismiss(null);
  }

  submit() {
    if (this.selectedReason) {
      this.modalController.dismiss(this.selectedReason);
    }
  }

  ngOnInit() {}

}

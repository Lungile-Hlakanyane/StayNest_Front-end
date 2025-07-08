import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class MyPropertiesComponent  implements OnInit {

  properties = [
    {
      name: 'Modern Loft Apartment',
      location: 'Sandton, Johannesburg',
      price: 850,
      image: 'assets/images/property1.jpg'
    },
    {
      name: 'Beachside Villa',
      location: 'Camps Bay, Cape Town',
      price: 1200,
      image: 'assets/images/property2.jpg'
    },
    {
      name: 'Cozy Cottage',
      location: 'Stellenbosch, Western Cape',
      price: 500,
      image: 'assets/images/property3.jpg'
    }
  ];

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

   editProperty(property: any) {
    console.log('Edit:', property);
  }

  deleteProperty(property: any) {
    console.log('Delete:', property);
  }

  navigate(link: string) {
    this.router.navigate([link]); 
  }

  goBack(){
    this.navCtrl.back();
  }

}

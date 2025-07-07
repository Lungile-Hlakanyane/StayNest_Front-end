import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { SideMenuComponent } from '../re-useable-components/side-menu/side-menu/side-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  searchTerm: string = '';

  accommodations = [
  {
    imageUrl: 'assets/accomodation_01.jpeg',
    rating: 4,
    landlord: 'GreenVilla Lodge',
    caption: 'A peaceful place to stay with your family and friends.',
    comments: 12
  },
  {
    imageUrl: 'assets/accomodation_02.jpeg',
    rating: 5,
    landlord: 'CityScape Apartments',
    caption: 'Modern living in the heart of the city.',
    comments: 8
  },
];

viewMore(post: any) {
  this.router.navigate(['/accomodation-details'], { state: { post } });
  console.log('View more clicked:', post);
}

constructor(
  private menuCtrl: MenuController,
  private modalController: ModalController,
  private router: Router
) {}

filteredAccommodations = [...this.accommodations];

filterAccommodations() {
  const term = this.searchTerm.toLowerCase();
  this.filteredAccommodations = this.accommodations.filter(post =>
    post.landlord.toLowerCase().includes(term) ||
    post.caption.toLowerCase().includes(term)
  );
}

openMenu() {
  this.menuCtrl.open();
}

async openMenuModal() {
  console.log('openMenuModal() called'); 

  const modal = await this.modalController.create({
    component: SideMenuComponent, 
  });

  await modal.present();
  console.log('Modal presented'); 
}



}

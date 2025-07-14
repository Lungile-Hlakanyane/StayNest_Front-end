import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { SideMenuComponent } from '../re-useable-components/side-menu/side-menu/side-menu.component';
import { Router } from '@angular/router';
import { PropertyService } from '../servicess/property-service/property.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

 searchTerm: string = '';
 accommodations: any[] = [];

viewMore(post: any) {
  this.router.navigate(['/accomodation-details'], { state: { post } });
  console.log('View more clicked:', post);
}

constructor(
  private menuCtrl: MenuController,
  private modalController: ModalController,
  private router: Router,
  private propertyService:PropertyService
) {}

ngOnInit() {
  this.loadProperties();
}

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


loadProperties() {
  this.propertyService.getAllProperties().subscribe({
    next: (res) => {
      console.log('Fetched properties:', res);
      this.accommodations = res.map((prop: any) => ({
        imageUrl: prop.image ? `data:image/jpeg;base64,${prop.image}` : 'assets/default-placeholder.png',
        rating: 4, // optional: add real ratings later
        landlord: prop.name,
        caption: prop.description,
        comments: 0, // optional: backend integration for comments
        ...prop
      }));
      this.filteredAccommodations = [...this.accommodations];
    },
    error: (err) => {
      console.error('Error fetching properties:', err);
    }
  });
}


}

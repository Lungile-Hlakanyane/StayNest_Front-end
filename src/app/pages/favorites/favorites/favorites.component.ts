import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class FavoritesComponent  implements OnInit {

  searchTerm: string = '';
  filteredFavorites: any[] = [];

  constructor() { }

  ngOnInit() {}

  favorites = [
    {
      imageUrl: 'assets/accomodation_01.jpeg',
      landlord: 'GreenVilla Lodge',
      caption: 'A peaceful place with modern comforts.',
      rating: 4
    },
    {
      imageUrl: 'assets/accomodation_02.jpeg',
      landlord: 'Sunset Apartments',
      caption: 'City views and sunset vibes.',
      rating: 5
    }
  ];

  view(item: any) {
    console.log('Viewing:', item);
  }

  remove(item: any) {
    this.favorites = this.favorites.filter(fav => fav !== item);
  }

  filterFavorites() {
  const term = this.searchTerm.toLowerCase();
  this.filteredFavorites = this.favorites.filter(item =>
    item.landlord.toLowerCase().includes(term) ||
    item.caption.toLowerCase().includes(term)
  );
}

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FavoriteService } from 'src/app/servicess/favorite-service/favorite.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class FavoritesComponent  implements OnInit {

  searchTerm: string = '';
  favorites: any[] = [];
  filteredFavorites: any[] = [];
  userId: number | null = null;

  constructor(
    private favoriteService: FavoriteService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    const storedUserId = localStorage.getItem('user');
    this.userId = storedUserId ? Number(storedUserId) : null;
    if (!this.userId) {
      this.presentToast('User not logged in', 'danger');
      return;
    }
    this.loadFavorites();
  }

  view(item: any) {
    console.log('Viewing:', item);
  }

remove(item: any) {
  const storedUserId = localStorage.getItem('user');
  const userId = storedUserId ? Number(storedUserId) : null;
  if (!userId) {
    console.error('No logged-in user ID found in local storage');
    return;
  }

  this.favoriteService.removeFavorite(userId, item.id).subscribe({
    next: async () => {
      // Remove from local favorites list
      this.favorites = this.favorites.filter(fav => fav.id !== item.id);
      this.filterFavorites();

      // Show success toast
      const toast = await this.toastController.create({
        message: 'Removed from favorites',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      await toast.present();
    },
    error: async () => {
      // Show failure toast
      const toast = await this.toastController.create({
        message: 'Failed to remove favorite',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  });
}


  filterFavorites() {
  const term = this.searchTerm.toLowerCase();
  this.filteredFavorites = this.favorites.filter(item =>
    item.landlord.toLowerCase().includes(term) ||
    item.caption.toLowerCase().includes(term)
  );
}

 async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    await toast.present();
}

loadFavorites() {
    if (!this.userId) return;
    this.favoriteService.getFavoritesByUser(this.userId).subscribe({
      next: (favorites) => {
        this.favorites = favorites.map(fav => ({
          ...fav,
          rating: fav.rating || 4,
          landlord: fav.landlord || fav.name || 'Unknown',
          caption: fav.caption || fav.description || ''
        }));
        this.filteredFavorites = [...this.favorites];
      },
      error: async () => {
        this.presentToast('Failed to load favorites', 'danger');
      }
    });
  }




}

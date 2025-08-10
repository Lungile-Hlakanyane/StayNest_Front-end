import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { SideMenuComponent } from '../re-useable-components/side-menu/side-menu/side-menu.component';
import { Router } from '@angular/router';
import { PropertyService } from '../servicess/property-service/property.service';
import { CommentService } from '../servicess/comment-service/comment.service';
import { CommentDTO } from '../models/CommentDTO';
import { AuthService } from '../servicess/auth-service/auth.service';

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
  private propertyService:PropertyService,
  private commentService:CommentService,
  private authService:AuthService
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
      this.accommodations = res.map((prop: any) => ({
        imageUrl: prop.image ? `data:image/jpeg;base64,${prop.image}` : 'assets/default-placeholder.png',
        rating: 4,
        landlord: prop.name,
        caption: prop.description,
        comments: [], // store actual comments array
        propertyId: prop.id,
        ...prop
      }));

      // Fetch comments for each property
      this.accommodations.forEach(post => {
        this.commentService.getCommentsByProperty(post.propertyId).subscribe(comments => {
          
          // For each comment, fetch user full_name
          comments.forEach(comment => {
            this.authService.getUserById(comment.userId).subscribe(user => {
              comment.fullName = user.fullName; // Add fullName property to comment
            });
          });

          post.comments = comments;
        });
      });

      this.filteredAccommodations = [...this.accommodations];
    },
    error: (err) => {
      console.error('Error fetching properties:', err);
    }
  });
}



toggleComment(post: any) {
  post.showCommentBox = !post.showCommentBox;
}

addComment(post: any) {
  if (post.newComment && post.newComment.trim() !== '') {
    const storedUserId = localStorage.getItem('user');
    const userId = storedUserId ? Number(storedUserId) : null;

    if (!userId) {
      console.error('No logged-in user ID found in local storage');
      return;
    }

    const newComment: CommentDTO = {
      propertyId: post.propertyId,
      comment: post.newComment,
      userId: userId
    };

    this.commentService.addComment(newComment).subscribe({
      next: (savedComment) => {
        console.log('Comment saved:', savedComment);
        post.comments.push(savedComment); // add new comment to array
        post.newComment = '';
        post.showCommentBox = false;
      },
      error: (err) => {
        console.error('Error saving comment:', err);
      }
    });
  }
}


}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../servicess/auth-service/auth.service';
import { UserDTO } from '../models/UserDTO';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class ViewUserComponent  implements OnInit {
  user?: UserDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private userService:AuthService,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
  this.fetchUserDetails();
  }

  async blockUser() {
   const alert = await this.alertCtrl.create({
    header: 'Block User',
    message: 'Are you sure you want to block this user?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Yes',
        handler: async () => {
          if (!this.user?.id) return;

          const loading = await this.loadingController.create({
            message: 'Blocking user...',
            spinner: 'circles'
          });
          await loading.present();

          this.userService.blockUser(this.user.id, true).subscribe({
            next: async () => {
              await loading.dismiss();
              this.user!.block = true;

              const toast = await this.toastCtrl.create({
                message: 'User has been blocked.',
                duration: 3000,
                color: 'success',
                position: 'top'
              });
              await toast.present();
            },
            error: async (err) => {
              await loading.dismiss();
              const toast = await this.toastCtrl.create({
                message: 'Failed to block user: ' + err.message,
                duration: 3000,
                color: 'danger',
                position: 'top'
              });
              await toast.present();
            }
          });
        }
      }
    ]
  });
  await alert.present();
}


async deleteUser() {
  const alert = await this.alertCtrl.create({
    header: 'Delete User',
    message: 'Are you sure you want to delete this user permanently?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: async () => {
          if (!this.user?.id) return;

          this.userService.deleteUserById(this.user.id).subscribe({
            next: async () => {
              const toast = await this.toastCtrl.create({
                message: 'User deleted successfully.',
                duration: 3000,
                color: 'success',
                position: 'top'
              });
              await toast.present();
              this.router.navigate(['/manage-users']);
            },
            error: async (err) => {
              const toast = await this.toastCtrl.create({
                message: 'Failed to delete user: ' + err.message,
                duration: 3000,
                color: 'danger',
                position: 'top'
              });
              await toast.present();
            }
          });
        }
      }
    ]
  });
  await alert.present();
}


  goBack() {
    this.router.navigate(['/manage-users']);
  }

  fetchUserDetails(){
    const userIdParam = this.route.snapshot.paramMap.get('id');
    const userId = userIdParam ? +userIdParam : null;
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe({
        next: (data) => {
          this.user = {
            ...data,
            photo: data.photo || '../../../../assets/profile-pic-image.jpg', // fallback
          };
        },
        error: (err) => {
          console.error('Failed to fetch user', err);
        },
      });
    }
  }


async toggleBlockUser() {
  const isBlocking = !this.user?.block;

  const alert = await this.alertCtrl.create({
    header: isBlocking ? 'Block User' : 'Unblock User',
    message: `Are you sure you want to ${isBlocking ? 'block' : 'unblock'} this user?`,
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Yes',
        handler: async () => {
          if (!this.user?.id) return;

          const loading = await this.loadingController.create({
            message: isBlocking ? 'Blocking user...' : 'Unblocking user...',
            spinner: 'circles'
          });
          await loading.present();

          this.userService.blockUser(this.user.id, isBlocking).subscribe({
            next: async () => {
              await loading.dismiss();
              this.user!.block = isBlocking;

              const toast = await this.toastCtrl.create({
                message: `User has been ${isBlocking ? 'blocked' : 'unblocked'}.`,
                duration: 3000,
                color: isBlocking ? 'danger' : 'success',
                position: 'top'
              });
              await toast.present();
            },
            error: async (err) => {
              await loading.dismiss();
              const toast = await this.toastCtrl.create({
                message: `Failed to ${isBlocking ? 'block' : 'unblock'} user: ${err.message}`,
                duration: 3000,
                color: 'danger',
                position: 'top'
              });
              await toast.present();
            }
          });
        }
      }
    ]
  });

  await alert.present();
}


}

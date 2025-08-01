import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicess/auth-service/auth.service';
import { UserDTO } from 'src/app/models/UserDTO';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class ManageUsersComponent  implements OnInit {

  searchTerm: string = '';
  users: UserDTO[] = [];
 
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.fetchAllUsers();
  }

   filteredUsers() {
    if (!this.searchTerm) return this.users;
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(user =>
      user.fullName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }

  viewUser(id: number) {
    this.router.navigate(['/view-user', id]);
  }

  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }

  fetchAllUsers() {
    this.authService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Failed to fetch users:', err)
    });
  }

}

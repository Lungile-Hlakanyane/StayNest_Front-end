import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class ManageUsersComponent  implements OnInit {

  searchTerm: string = '';
  users = [
    {
      fullName: 'Lungile Hlakanyane',
      email: 'lungile@gmail.com',
      role: 'Tenant',
      photo: 'assets/profile-pic-image.jpg'
    },
    {
      fullName: 'Nandi Nkosi',
      email: 'nandi@landlord.co.za',
      role: 'Landlord',
      photo: 'assets/profile-pic-image.jpg'
    },
    {
      fullName: 'Admin Manager',
      email: 'admin@staynest.co.za',
      role: 'Admin',
      photo: 'assets/profile-pic-image.jpg'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {}

   filteredUsers() {
    if (!this.searchTerm) return this.users;
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(user =>
      user.fullName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }

  viewUser() {
    this.router.navigate(['/view-user']);
  }

  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }

}

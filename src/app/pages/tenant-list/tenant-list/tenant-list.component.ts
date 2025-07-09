import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class TenantListComponent  implements OnInit {
  searchTerm: string = '';
  tenants: any[] = []; // all tenants
  filteredTenants: any[] = []; // filtered list for display


  constructor(private router: Router) {}

  ngOnInit() {
  this.tenants = [
    {
      fullName: 'Lungile Hlakanyane',
      email: 'lungile@gmail.com',
      photo: 'assets/profile-pic-image.jpg',
      propertyName: 'Green Villa 103'
    },
    {
      fullName: 'Nomsa Dlamini',
      email: 'nomsa.d@example.com',
      photo: 'assets/profile-pic-image.jpg',
      propertyName: 'Oceanview Apartment'
    },
    {
      fullName: 'Thabo Nkosi',
      email: 'thabo.n@example.com',
      photo: 'assets/profile-pic-image.jpg',
      propertyName: 'Luxury Heights'
    }
  ];
  this.filteredTenants = [...this.tenants];
}


goBack() {
  this.router.navigate(['/home']);
}

viewTenant() {
  this.router.navigateByUrl('/tenant-profile');
  console.log('Viewing tenant:');
}

filterTenants() {
  const term = this.searchTerm.toLowerCase();
  this.filteredTenants = this.tenants.filter(tenant =>
    tenant.fullName.toLowerCase().includes(term) ||
    tenant.email.toLowerCase().includes(term) ||
    tenant.propertyName.toLowerCase().includes(term)
  );
}

}

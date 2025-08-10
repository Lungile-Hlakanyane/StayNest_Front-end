import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/servicess/auth-service/auth.service';
import { CalendarService } from 'src/app/servicess/calendar-service/calendar.service';
import { PropertyService } from 'src/app/servicess/property-service/property.service';


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

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private calendarService: CalendarService, 
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
  this.loadTenants();
}


goBack() {
  this.router.navigate(['/home']);
}

viewTenant(tenant: any) {
  this.router.navigateByUrl('/tenant-profile', {
    state: { tenant }
  });
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

loadTenants() {
  const landlordId = Number(localStorage.getItem('user'));
  if (!landlordId) return;

  this.calendarService.getAllBookedSlots().toPromise()
    .then(slots => {
      if (!slots) return;

      const bookedSlotsForLandlord = slots.filter(slot =>
        slot.landlord?.id === landlordId
      );

      this.tenants = bookedSlotsForLandlord.map(slot => {
        const tenantData = {
          id: slot.bookedBy?.id,
          fullName: slot.bookedBy?.fullName || 'Unknown Tenant',
          email: slot.bookedBy?.email || 'Unknown Email',
          photo: 'assets/profile-pic-image.jpg',
          propertyName: slot.property?.name || 'Unknown Property',
          phoneNumber: slot.bookedBy?.phoneNumber || 'Unknown Phone',
          availableDate: slot.availableDate || '',
        };
        console.log('Mapped tenant data:', tenantData);
        return tenantData;
      });

      this.filteredTenants = [...this.tenants];
      console.log('Filtered tenants:', this.filteredTenants);
    })
    .catch(err => {
      console.error('Failed to load tenants:', err);
    });
}




}

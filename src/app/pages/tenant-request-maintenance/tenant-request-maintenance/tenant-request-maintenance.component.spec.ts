import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TenantRequestMaintenanceComponent } from './tenant-request-maintenance.component';

describe('TenantRequestMaintenanceComponent', () => {
  let component: TenantRequestMaintenanceComponent;
  let fixture: ComponentFixture<TenantRequestMaintenanceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantRequestMaintenanceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TenantRequestMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminReportsAnalyticsComponent } from './admin-reports-analytics.component';

describe('AdminReportsAnalyticsComponent', () => {
  let component: AdminReportsAnalyticsComponent;
  let fixture: ComponentFixture<AdminReportsAnalyticsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReportsAnalyticsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReportsAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

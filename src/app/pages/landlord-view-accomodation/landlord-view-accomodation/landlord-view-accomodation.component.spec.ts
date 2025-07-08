import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LandlordViewAccomodationComponent } from './landlord-view-accomodation.component';

describe('LandlordViewAccomodationComponent', () => {
  let component: LandlordViewAccomodationComponent;
  let fixture: ComponentFixture<LandlordViewAccomodationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordViewAccomodationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LandlordViewAccomodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

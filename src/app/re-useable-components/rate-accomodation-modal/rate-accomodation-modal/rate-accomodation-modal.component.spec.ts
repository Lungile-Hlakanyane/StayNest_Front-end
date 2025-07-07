import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RateAccomodationModalComponent } from './rate-accomodation-modal.component';

describe('RateAccomodationModalComponent', () => {
  let component: RateAccomodationModalComponent;
  let fixture: ComponentFixture<RateAccomodationModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RateAccomodationModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RateAccomodationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

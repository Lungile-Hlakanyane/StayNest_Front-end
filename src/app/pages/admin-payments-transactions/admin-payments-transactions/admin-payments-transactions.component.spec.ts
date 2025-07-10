import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminPaymentsTransactionsComponent } from './admin-payments-transactions.component';

describe('AdminPaymentsTransactionsComponent', () => {
  let component: AdminPaymentsTransactionsComponent;
  let fixture: ComponentFixture<AdminPaymentsTransactionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentsTransactionsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPaymentsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

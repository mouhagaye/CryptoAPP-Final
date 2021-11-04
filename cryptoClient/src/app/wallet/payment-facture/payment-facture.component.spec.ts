import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFactureComponent } from './payment-facture.component';

describe('PaymentFactureComponent', () => {
  let component: PaymentFactureComponent;
  let fixture: ComponentFixture<PaymentFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

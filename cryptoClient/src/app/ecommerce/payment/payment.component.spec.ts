import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymantComponent } from './payment.component';

describe('PaymantComponent', () => {
  let component: PaymantComponent;
  let fixture: ComponentFixture<PaymantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

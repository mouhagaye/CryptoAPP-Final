import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertMoneyComponent } from './transfert-money.component';

describe('TransfertMoneyComponent', () => {
  let component: TransfertMoneyComponent;
  let fixture: ComponentFixture<TransfertMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

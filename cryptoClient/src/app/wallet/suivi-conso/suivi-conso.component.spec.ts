import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviConsoComponent } from './suivi-conso.component';

describe('SuiviConsoComponent', () => {
  let component: SuiviConsoComponent;
  let fixture: ComponentFixture<SuiviConsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviConsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviConsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

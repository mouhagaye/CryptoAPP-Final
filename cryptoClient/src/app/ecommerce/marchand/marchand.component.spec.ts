import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchandComponent } from './marchand.component';

describe('MarchandComponent', () => {
  let component: MarchandComponent;
  let fixture: ComponentFixture<MarchandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarchandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

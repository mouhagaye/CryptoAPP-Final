import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAchatComponent } from './code-achat.component';

describe('CodeAchatComponent', () => {
  let component: CodeAchatComponent;
  let fixture: ComponentFixture<CodeAchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

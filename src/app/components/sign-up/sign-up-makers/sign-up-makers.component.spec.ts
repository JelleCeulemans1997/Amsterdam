import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpMakersComponent } from './sign-up-makers.component';

describe('SignUpMakersComponent', () => {
  let component: SignUpMakersComponent;
  let fixture: ComponentFixture<SignUpMakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpMakersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpMakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

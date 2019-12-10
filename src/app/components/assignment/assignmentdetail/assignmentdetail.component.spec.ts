import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentdetailComponent } from './assignmentdetail.component';

describe('AssignmentdetailComponent', () => {
  let component: AssignmentdetailComponent;
  let fixture: ComponentFixture<AssignmentdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

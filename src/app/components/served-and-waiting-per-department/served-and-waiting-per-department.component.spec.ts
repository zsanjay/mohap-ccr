import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServedAndWaitingPerDepartmentComponent } from './served-and-waiting-per-department.component';

describe('ServedAndWaitingPerDepartmentComponent', () => {
  let component: ServedAndWaitingPerDepartmentComponent;
  let fixture: ComponentFixture<ServedAndWaitingPerDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServedAndWaitingPerDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServedAndWaitingPerDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

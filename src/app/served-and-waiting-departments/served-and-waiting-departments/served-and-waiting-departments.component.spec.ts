import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServedAndWaitingDepartmentsComponent } from './served-and-waiting-departments.component';

describe('ServedAndWaitingDepartmentsComponent', () => {
  let component: ServedAndWaitingDepartmentsComponent;
  let fixture: ComponentFixture<ServedAndWaitingDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServedAndWaitingDepartmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServedAndWaitingDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

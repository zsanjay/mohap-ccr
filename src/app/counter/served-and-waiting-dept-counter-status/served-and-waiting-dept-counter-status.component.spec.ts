import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServedAndWaitingDeptCounterStatusComponent } from './served-and-waiting-dept-counter-status.component';

describe('ServedAndWaitingDeptCounterStatusComponent', () => {
  let component: ServedAndWaitingDeptCounterStatusComponent;
  let fixture: ComponentFixture<ServedAndWaitingDeptCounterStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServedAndWaitingDeptCounterStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServedAndWaitingDeptCounterStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

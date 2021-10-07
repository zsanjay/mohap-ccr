import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeakHoursComponent } from './peak-hours.component';

describe('PeakHoursComponent', () => {
  let component: PeakHoursComponent;
  let fixture: ComponentFixture<PeakHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeakHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeakHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

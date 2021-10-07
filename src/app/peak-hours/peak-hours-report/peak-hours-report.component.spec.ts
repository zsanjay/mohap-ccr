import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeakHoursReportComponent } from './peak-hours-report.component';

describe('PeakHoursReportComponent', () => {
  let component: PeakHoursReportComponent;
  let fixture: ComponentFixture<PeakHoursReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeakHoursReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeakHoursReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

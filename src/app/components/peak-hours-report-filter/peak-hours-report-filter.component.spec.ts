import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeakHoursReportFilterComponent } from './peak-hours-report-filter.component';

describe('PeakHoursReportFilterComponent', () => {
  let component: PeakHoursReportFilterComponent;
  let fixture: ComponentFixture<PeakHoursReportFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeakHoursReportFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeakHoursReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeakHourCardComponent } from './peak-hour-card.component';

describe('PeakHourCardComponent', () => {
  let component: PeakHourCardComponent;
  let fixture: ComponentFixture<PeakHourCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeakHourCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeakHourCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

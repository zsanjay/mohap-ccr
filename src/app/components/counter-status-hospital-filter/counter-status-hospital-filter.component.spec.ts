import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStatusHospitalFilterComponent } from './counter-status-hospital-filter.component';

describe('CounterStatusHospitalFilterComponent', () => {
  let component: CounterStatusHospitalFilterComponent;
  let fixture: ComponentFixture<CounterStatusHospitalFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterStatusHospitalFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStatusHospitalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

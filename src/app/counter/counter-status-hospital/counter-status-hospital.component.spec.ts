import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStatusHospitalComponent } from './counter-status-hospital.component';

describe('CounterStatusHospitalComponent', () => {
  let component: CounterStatusHospitalComponent;
  let fixture: ComponentFixture<CounterStatusHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterStatusHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStatusHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

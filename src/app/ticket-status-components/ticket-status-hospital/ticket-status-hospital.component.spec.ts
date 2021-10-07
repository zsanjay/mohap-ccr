import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStatusHospitalComponent } from './ticket-status-hospital.component';

describe('TicketStatusHospitalComponent', () => {
  let component: TicketStatusHospitalComponent;
  let fixture: ComponentFixture<TicketStatusHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketStatusHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStatusHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

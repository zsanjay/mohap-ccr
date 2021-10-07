import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStatusHospitalFilterComponent } from './ticket-status-hospital-filter.component';

describe('TicketStatusHospitalFilterComponent', () => {
  let component: TicketStatusHospitalFilterComponent;
  let fixture: ComponentFixture<TicketStatusHospitalFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketStatusHospitalFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStatusHospitalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStatusFilterComponent } from './ticket-status-filter.component';

describe('TicketStatusFilterComponent', () => {
  let component: TicketStatusFilterComponent;
  let fixture: ComponentFixture<TicketStatusFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketStatusFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStatusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

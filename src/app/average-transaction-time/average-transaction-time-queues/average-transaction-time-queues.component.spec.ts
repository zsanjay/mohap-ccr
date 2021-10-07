import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageTransactionTimeQueuesComponent } from './average-transaction-time-queues.component';

describe('AverageTransactionTimeQueuesComponent', () => {
  let component: AverageTransactionTimeQueuesComponent;
  let fixture: ComponentFixture<AverageTransactionTimeQueuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageTransactionTimeQueuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageTransactionTimeQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

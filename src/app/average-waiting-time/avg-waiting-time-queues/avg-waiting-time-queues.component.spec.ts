import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgWaitingTimeQueuesComponent } from './avg-waiting-time-queues.component';

describe('AvgWaitingTimeQueuesComponent', () => {
  let component: AvgWaitingTimeQueuesComponent;
  let fixture: ComponentFixture<AvgWaitingTimeQueuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgWaitingTimeQueuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgWaitingTimeQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

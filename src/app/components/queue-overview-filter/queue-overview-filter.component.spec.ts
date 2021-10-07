import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueOverviewFilterComponent } from './queue-overview-filter.component';

describe('QueueOverviewFilterComponent', () => {
  let component: QueueOverviewFilterComponent;
  let fixture: ComponentFixture<QueueOverviewFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueOverviewFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueOverviewFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuesOverviewComponent } from './queues-overview.component';

describe('QueuesOverviewComponent', () => {
  let component: QueuesOverviewComponent;
  let fixture: ComponentFixture<QueuesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueuesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

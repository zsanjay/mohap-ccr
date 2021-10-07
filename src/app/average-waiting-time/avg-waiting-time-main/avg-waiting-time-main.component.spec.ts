import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgWaitingTimeMainComponent } from './avg-waiting-time-main.component';

describe('AvgWaitingTimeMainComponent', () => {
  let component: AvgWaitingTimeMainComponent;
  let fixture: ComponentFixture<AvgWaitingTimeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgWaitingTimeMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgWaitingTimeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

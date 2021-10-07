import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStatusLiveComponent } from './counter-status-live.component';

describe('CounterStatusLiveComponent', () => {
  let component: CounterStatusLiveComponent;
  let fixture: ComponentFixture<CounterStatusLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterStatusLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStatusLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

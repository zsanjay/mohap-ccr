import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStatusLiveFilterComponent } from './counter-status-live-filter.component';

describe('CounterStatusLiveFilterComponent', () => {
  let component: CounterStatusLiveFilterComponent;
  let fixture: ComponentFixture<CounterStatusLiveFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterStatusLiveFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStatusLiveFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

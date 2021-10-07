import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStatusFilterComponent } from './counter-status-filter.component';

describe('CounterStatusFilterComponent', () => {
  let component: CounterStatusFilterComponent;
  let fixture: ComponentFixture<CounterStatusFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterStatusFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStatusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

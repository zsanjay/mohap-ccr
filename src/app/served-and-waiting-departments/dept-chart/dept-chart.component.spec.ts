import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptChartComponent } from './dept-chart.component';

describe('DeptChartComponent', () => {
  let component: DeptChartComponent;
  let fixture: ComponentFixture<DeptChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

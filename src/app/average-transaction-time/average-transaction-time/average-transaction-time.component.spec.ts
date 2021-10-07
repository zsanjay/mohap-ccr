import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageTransactionTimeComponent } from './average-transaction-time.component';

describe('AverageTransactionTimeComponent', () => {
  let component: AverageTransactionTimeComponent;
  let fixture: ComponentFixture<AverageTransactionTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageTransactionTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageTransactionTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

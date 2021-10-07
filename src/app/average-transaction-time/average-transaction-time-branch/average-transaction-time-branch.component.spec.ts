import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageTransactionTimeBranchComponent } from './average-transaction-time-branch.component';

describe('AverageTransactionTimeBranchComponent', () => {
  let component: AverageTransactionTimeBranchComponent;
  let fixture: ComponentFixture<AverageTransactionTimeBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageTransactionTimeBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageTransactionTimeBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

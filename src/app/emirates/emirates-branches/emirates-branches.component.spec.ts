import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiratesBranchesComponent } from './emirates-branches.component';

describe('EmiratesBranchesComponent', () => {
  let component: EmiratesBranchesComponent;
  let fixture: ComponentFixture<EmiratesBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmiratesBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiratesBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

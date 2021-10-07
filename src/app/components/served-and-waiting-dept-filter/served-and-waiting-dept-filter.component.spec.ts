import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServedAndWaitingDeptFilterComponent } from './served-and-waiting-dept-filter.component';

describe('ServedAndWaitingDeptFilterComponent', () => {
  let component: ServedAndWaitingDeptFilterComponent;
  let fixture: ComponentFixture<ServedAndWaitingDeptFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServedAndWaitingDeptFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServedAndWaitingDeptFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

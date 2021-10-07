import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServedAndWaitingDepartmentsBootstapComponent } from './served-and-waiting-departments-bootstap.component';

describe('ServedAndWaitingDepartmentsBootstapComponent', () => {
  let component: ServedAndWaitingDepartmentsBootstapComponent;
  let fixture: ComponentFixture<ServedAndWaitingDepartmentsBootstapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServedAndWaitingDepartmentsBootstapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServedAndWaitingDepartmentsBootstapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

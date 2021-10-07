import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappinessMeterComponent } from './happiness-meter.component';

describe('HappinessMeterComponent', () => {
  let component: HappinessMeterComponent;
  let fixture: ComponentFixture<HappinessMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HappinessMeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HappinessMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

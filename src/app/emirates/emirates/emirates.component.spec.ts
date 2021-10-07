import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiratesComponent } from './emirates.component';

describe('EmiratesComponent', () => {
  let component: EmiratesComponent;
  let fixture: ComponentFixture<EmiratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmiratesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

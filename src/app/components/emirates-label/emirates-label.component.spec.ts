import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiratesLabelComponent } from './emirates-label.component';

describe('EmiratesLabelComponent', () => {
  let component: EmiratesLabelComponent;
  let fixture: ComponentFixture<EmiratesLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmiratesLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiratesLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayViewContainerComponent } from './day-view-container.component';

describe('DayViewContainerComponent', () => {
  let component: DayViewContainerComponent;
  let fixture: ComponentFixture<DayViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayViewContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

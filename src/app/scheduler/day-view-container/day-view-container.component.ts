import { Component } from '@angular/core';
import { SchedulerGridComponent } from '../scheduler-grid/scheduler-grid.component';

@Component({
  selector: 'app-day-view-container',
  standalone: true,
  imports: [SchedulerGridComponent],
  templateUrl: './day-view-container.component.html',
  styleUrl: './day-view-container.component.scss'
})
export class DayViewContainerComponent {
public resources: any = [
		{ id: 'r1', name: 'Alice' },
		{ id: 'r2', name: 'Bob' },
		{ id: 'r3', name: 'aBob' }
	];
	public appointments: any = [
		{ resourceId: 'r1', start: new Date(2025, 6, 1, 9, 3), end: new Date(2025, 6, 1, 9, 13), type: 'booked' },
		{ resourceId: 'r2', start: new Date(2025, 6, 1, 9, 45), end: new Date(2025, 6, 1, 10, 30), type: 'unavailable' }
	];
	public config = { startHour: 9, endHour:17, slotMinutes: 15, pxPerMinute: 1 };
}

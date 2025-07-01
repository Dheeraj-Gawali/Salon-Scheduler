import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Appointment {
  resource: string;
  start: Date;
  end: Date;
  title: string;
}

@Component({
	selector: 'app-scheduler-grid',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './scheduler-grid.component.html',
	styleUrl: './scheduler-grid.component.scss'
})
export class SchedulerGridComponent {
	@Input() resources: any;
	@Input() appointments: any;
	@Input() config: any;

	public totalMinutes: any
	public timeSlots: any;
	public slotPerHour: any;
	public currentTimeOffset: any;

	today: Date = new Date();
  	timerId!: any;

	ngOnInit() {
		 this.timerId = setInterval(() => this.today = new Date(), 60000); // update each minute
		this.totalMinutes = (this.config.endHour - this.config.startHour) * 60;
		this.generateTimeSlots();
	}
	ngOnDestroy() {
		clearInterval(this.timerId);
	}
	getSlotPosition(app: Appointment) {
		const startMinute = app.start.getHours()*60 + app.start.getMinutes();
		const endMinute = app.end.getHours()*60 + app.end.getMinutes();
		const durationSlots = (endMinute - startMinute) / 15;
		const rowStartIndex = ((startMinute - 9*60) / 15);
		return { rowStartIndex, durationSlots };
	}
	 getSlotAppointments(hour: number, slot: number, res: string): Appointment[] {
		const minute = slot * 15;
		const slotStart = `${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}`;
		const slotEndMin = minute + 15;
		const slotEnd = `${hour.toString().padStart(2,'0')}:${slotEndMin.toString().padStart(2,'0')}`;
		return this.appointments.filter((app: any) =>
		app.resource === res &&
		app.start < slotEnd &&
		app.end > slotStart
		);
	}
	generateTimeSlots() {
		let array = [];
		for (let hour = this.config.startHour; hour <= this.config.endHour; hour++) {
				const time = new Date();
				time.setHours(hour, 0, 0, 0); // Set hour and minute, clear seconds/milliseconds
				// Format the time as "HH:MM AM/PM"
				const formattedTime = time.toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true
				});
				array.push(formattedTime);
		}
		this.timeSlots = array
	}
	getTopOffset(): number {
		const minutes = (this.today.getHours() - 17) * 60 + this.today.getMinutes();
		return minutes * (40 / this.config.slotMinutes);
	}

	getHeightPx(): number {
		let starDateMinute = 9 * 60 ;
		let endDateMinute = 17 * 60 ;
		let getHeight = ( endDateMinute - starDateMinute ) * this.config.pxPerMinute;
		return getHeight;
	}
	getTime(hour: number, si: number): string {
		const m = si * 15;
		return `${hour}:${m.toString().padStart(2,'0')}`;
	}

	isBooked(res: string, time: string): boolean {
		return this.appointments.some((a: any) =>
			a.resource===res && a.start===time
		);
	}
	getAppointment(res: string, time: string) {
		return this.appointments.find((a: any) =>
			a.resource===res && a.start===time
		);
	}
	book(res: any, time: string) {
		const title = prompt(`Appointment for ${res.name} at ${time}?`);
		if (!title) return;
		this.appointments.push({resource: res, start: time, duration: 15, title});
	}
}

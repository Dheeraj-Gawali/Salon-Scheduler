import { Routes } from '@angular/router';
import { DayViewContainerComponent } from './scheduler/day-view-container/day-view-container.component';
import { SchedulerGridComponent } from './scheduler/scheduler-grid/scheduler-grid.component';

export const routes: Routes = [
    { path: 'dayView', component: DayViewContainerComponent },
    { path: 'scheduler', component: SchedulerGridComponent },
    { path: '', redirectTo: '/dayView', pathMatch: 'full' } // Default route
];

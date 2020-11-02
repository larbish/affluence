import { Component, Inject, OnInit } from '@angular/core';
import { TimeSlot } from './timetables.model';
import { TIMETABLE_INFO, TIMETABLE_PROVIDERS } from './timetables.providers';
import { TimetablesService } from './timetables.service';

@Component({
	selector: 'app-timetables',
	templateUrl: 'timetables.component.html',
	styleUrls: ['timetables.component.scss'],
})
export class TimetablesComponent implements OnInit {
	public loading: boolean;
	public active: number;
	public timeSlots: TimeSlot[];

	constructor(private timetablesService: TimetablesService) {}
	
	ngOnInit(): void {
		this.subscribeToSavedTimetable();
	}

	subscribeToSavedTimetable(): void {
		this.timetablesService.getTimetable().subscribe((res: TimeSlot[]) => {
			this.timeSlots = res;
		});
	}

	interceptNewTimetableEvent($event: TimeSlot[]): void {
		this.timeSlots = $event;
		this.active = 1;
	}
}

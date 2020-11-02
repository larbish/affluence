import { Component, Input, OnInit } from '@angular/core';
import { TimeSlot } from '../timetables.model';
import { TimetablesService } from '../timetables.service';

@Component({
	selector: 'app-saved-table',
	templateUrl: 'saved-table.component.html',
	styleUrls: ['saved-table.component.scss'],
})
export class SavedTableComponent implements OnInit {
	@Input() public timeSlots: TimeSlot[];
	@Input() public canDeleteSlots: boolean = true;

	constructor(private timetablesService: TimetablesService) {}

	public loading:boolean = false;

	ngOnInit(): void {}

	deleteSlots(): void {
		this.loading = true;

		const timeSlotsToKeep: TimeSlot[] = this.timeSlots.filter((timeSlot: TimeSlot) => {
			return !timeSlot.selected;
		});

		this.timetablesService.updateTimetable(timeSlotsToKeep).subscribe((res: TimeSlot[]) => {
			this.timeSlots = res;
			this.loading = false;
		});
	}
}

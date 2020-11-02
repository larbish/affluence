import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TimeSlot, Timetable } from '../timetables.model';
import { TimetablesService } from '../timetables.service';

@Component({
	selector: 'app-upload-table',
	templateUrl: 'upload-table.component.html',
	styleUrls: ['upload-table.component.scss'],
})
export class UploadTableComponent implements OnInit{
	@Output() timetableSaved: EventEmitter<TimeSlot[]> = new EventEmitter<TimeSlot[]>(); // Send saved timetable to Parent component

	constructor(private timetablesService: TimetablesService) {}

	public loading:boolean = false;
	public csvFile: File;
	public timetableToSave: Timetable;

	ngOnInit(): void {}

	onFileChange(files: FileList): void {
		if (files.length > 0) this.csvFile = files.item(0);
	}

	uploadCsv(): void {
		if (!this.csvFile) return;

		this.loading = true;

		const fileReader: FileReader = new FileReader();

		fileReader.readAsText(this.csvFile);
		fileReader.onload = () => {
			const csvdata = fileReader.result.toString();
			const body = { data: csvdata };

			this.timetablesService.uploadTimetableAsCsv(body).subscribe((timetable: Timetable)=> {
				this.timetableToSave = timetable;
				this.loading = false;
			});
		};
	}

	saveTimetable(): void {
		if (!this.timetableToSave) return;

		this.loading = true;

		this.timetablesService.saveTimetable(this.timetableToSave).subscribe((res: TimeSlot[])=> {
			this.timetableSaved.emit(res);
			this.timetableToSave = null;
			this.loading = false;
		});
	}
}

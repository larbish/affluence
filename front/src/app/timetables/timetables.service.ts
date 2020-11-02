import { HttpClient } from '@angular/common/http';
import { LIFECYCLE_HOOKS_VALUES } from '@angular/compiler/src/lifecycle_reflector';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimeSlot, Timetable } from './timetables.model';

@Injectable()
export class TimetablesService {
	constructor(public http: HttpClient) {}

	getTimetable(): Observable<TimeSlot[]> {
		return this.http.get('/timetables').pipe(
			map((res: Timetable) => {
				if (!res) return null;
				return res.timeSlots.map((slot: TimeSlot) => {
					return { ...slot, selected: false };
				});
			})
		);
	}

	uploadTimetableAsCsv(body: { data: string }): Observable<Timetable> {
		return this.http.post<Timetable>('/timetables/upload', body);
	}

	saveTimetable(timetable: Timetable): Observable<TimeSlot[]> {
		return this.http.post<Timetable>('/timetables', timetable).pipe(
			map((res: Timetable) => {
				if (!res) return null;
				return res.timeSlots.map((slot: TimeSlot) => {
					return { ...slot, selected: false };
				});
			})
		);
	}

	updateTimetable(timeSlots: TimeSlot[]): Observable<TimeSlot[]> {
		timeSlots.map((timeSlot: TimeSlot) => { 
			delete timeSlot.selected;
			return timeSlot;
		});
	
		return this.http.put<Timetable>('/timetables', { timeSlots }).pipe(
			map((res: Timetable) => {
				if (!res) return null;
				return res.timeSlots.map((slot: TimeSlot) => {
					return { ...slot, selected: false };
				});
			})
		);
	}
}

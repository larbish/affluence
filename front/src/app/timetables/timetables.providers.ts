import { InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeSlot } from './timetables.model';
import { TimetablesService } from './timetables.service';

// Token to access a stream with the information you need
export const TIMETABLE_INFO = new InjectionToken<Observable<TimeSlot[]>>('A stream with current saved timetable info',);
 
export const TIMETABLE_PROVIDERS: Provider[] = [
	{
		provide: TIMETABLE_INFO,
		deps: [TimetablesService],
		useFactory: timetableFactory,
	}
 ];
 
 export function timetableFactory(timetablesService: TimetablesService): Observable<TimeSlot[]> {
	return timetablesService.getTimetable();
 }
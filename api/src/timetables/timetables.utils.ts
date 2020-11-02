import * as csv from 'csv-parser';
import * as fs from 'fs';
import { Hours, Timetable } from './timetables.model';

function concatDateAndTime(date: string, time: string): string {
	return `${date}T${time}`;
}

export function formatTimetable(table: Hours[]): Timetable {
	const timetable: Timetable = {
		startDate: '',
		endDate: '',
		timeSlots: []
	};

	const firstIndex: number = 0;
	let currentOpeningDatetime: string;
	let currentClosingDatetime: string;
	let sameday: boolean = false;

	table.forEach((row: Hours, index: number) => {	
		const openingDatetime: string = concatDateAndTime(row.opening_day, row.opening_time);
		const closingDatetime: string = concatDateAndTime(row.closing_day, row.closing_time);

		// Rule 3
		if (row.opening_time === "NULL" || row.closing_time === "NULL") {
			if (index === firstIndex) firstIndex+1;
			return;
		}

		// First Opening day
		if (index === firstIndex) timetable.startDate = row.opening_day;

		const openAllday: boolean = (row.opening_time === "00:00:00" && row.closing_time === '23:59:59');

		// Rule 2 => push last chunck and current chunck then return
		if (openAllday) {
			timetable.timeSlots.push({ openingDatetime: currentOpeningDatetime, closingDatetime: currentClosingDatetime });
			timetable.timeSlots.push({ openingDatetime, closingDatetime });
			return;
		}

		if (sameday) {
			// Rule 1
			if (row.opening_time !== "00:00:00")  {
				sameday = false;
				// Push last one
				timetable.timeSlots.push({ openingDatetime: currentOpeningDatetime, closingDatetime: currentClosingDatetime });
			}
		}

		currentClosingDatetime = closingDatetime;

		// If not the same day => currentOpening become the current chunck one
		if (!sameday) currentOpeningDatetime = openingDatetime;
		
		if (row.closing_time !== '23:59:59') {
			timetable.timeSlots.push({ openingDatetime: currentOpeningDatetime, closingDatetime: currentClosingDatetime });
			sameday = false;
		} else sameday = true;
	});

	timetable.endDate = timetable.timeSlots[timetable.timeSlots.length - 1].closingDatetime.split('T')[0];

	return timetable;
}

// export async function parseCsvToJSon(): Promise<Timetable> {
// 	// tslint:disable-next-line:no-any
// 	return new Promise((resolve: (value?: Timetable) => void, reject: (reason?: any) => void) => {
// 		const response: Timetable = { 
// 			startDate: '',
// 			endDate: '',
// 			timetable: []
// 		};
	
// 		const count: number = 0;
// 		let currentOpeningDatetime: string;
// 		let currentClosingDatetime: string;
// 		let sameday: boolean = false;
	
// 		fs.createReadStream('timetables.csv')
// 			.pipe(csv())
// 			.on('data', (row: Hours) => {
// 				if (count === 0) response.startDate = row.opening_day;
			
// 				const openingDatetime: string = concatDateAndTime(row.opening_day, row.opening_time);
// 				const closingDatetime: string = concatDateAndTime(row.closing_day, row.closing_time);
	
// 				// Rule 3
// 				if (row.opening_time === "NULL" && row.closing_time === "NULL") return;
	
// 				const openAllday: boolean = (row.opening_time === "00:00:00" && row.closing_time === '23:59:59');
	
// 				// Rule 2 => push last chunck and current chunck then return
// 				if (openAllday) {
// 					timetable.timeSlots.push({ openingDatetime: currentOpeningDatetime, closingDatetime: currentClosingDatetime });
// 					timetable.timeSlots.push({ openingDatetime: openingDatetime, closingDatetime: closingDatetime });
// 					return;
// 				}
	
// 				if (sameday) {
// 					// Rule 1
// 					if (row.opening_time !== "00:00:00")  {
// 						sameday = false;
// 						// Push last one
// 						timetable.timeSlots.push({ openingDatetime: currentOpeningDatetime, closingDatetime: currentClosingDatetime });
// 					}
// 				}
	
// 				currentClosingDatetime = closingDatetime;
	
// 				// If not the same day => currentOpening become the current chunck one
// 				if (!sameday) currentOpeningDatetime = openingDatetime;
				
// 				if (row.closing_time !== '23:59:59') {
// 					console.log('push!');
// 					timetable.timeSlots.push({ openingDatetime: currentOpeningDatetime, closingDatetime: currentClosingDatetime });
// 					sameday = false;
// 				} else sameday = true;
	
// 				count+1;
// 			})
// 			.on('end', () => {
// 				response.endDate = currentOpeningDatetime.split('T')[0];
// 				resolve(response);
// 				console.log('CSV file successfully processed');
// 			});
// 	});
// }

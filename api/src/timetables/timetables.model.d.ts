import { MongoObject } from "../mongo.model";

export interface Hours { 
	opening_day: string; 
  	opening_time: string; 
  	closing_day: string; 
  	closing_time: string; 
}

export interface Timetable extends MongoObject {
	startDate: string;
	endDate: string;
	timeSlots: TimeSlot[];
}

export interface TimeSlot  {
	openingDatetime: string;
	closingDatetime: string;
}

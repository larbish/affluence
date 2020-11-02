import * as csvtojson from 'csvtojson';
import * as express from 'express';
import { TimeSlot, Timetable } from './timetables.model';
import { TimetablesService } from './timetables.services';
import { formatTimetable } from './timetables.utils';

const timetablesRouter = express.Router();
const timetablesService = new TimetablesService();

timetablesRouter.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // tslint:disable-next-line:no-console
  console.log('Timetables router - Time: ', Date.now());
  next();
});

// Get timetable from mongo
timetablesRouter.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  	res.send(await timetablesService.findOneByUserId('test'));
});

// Create timetable
timetablesRouter.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const timetableToUpdate: Timetable = req.body;
	let response: Timetable;

	const existingTimetable: Timetable | null = await timetablesService.findOneByUserId('test');

	if (existingTimetable) {
		// tslint:disable-next-line:no-console
		console.log('Find existing timetable => Updating it !');
		response = await timetablesService.updateOne(timetableToUpdate, 'test');
	} else {
		// tslint:disable-next-line:no-console
		console.log('Creating timetable !');
		response = await timetablesService.insertOne(timetableToUpdate, 'test');
	}

	const status: number = existingTimetable ? 200 : 201;

	res.status(status).send(response);
});

// Update timetable
timetablesRouter.put('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const timetableToUpdate: { timeSlots: TimeSlot[] } = req.body;

	// tslint:disable-next-line:no-console
	console.log('Updating timetable!');
	const response: Timetable = await timetablesService.updateOne(timetableToUpdate, 'test');

	res.status(200).send(response);
});

timetablesRouter.post('/upload', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const csvDataBuffer = JSON.stringify(req.body);
	const csvData = JSON.parse(csvDataBuffer).data;	
	const csvDataString = csvData.toString('utf8');

	csvtojson()
		.fromString(csvDataString)
		.then((json) => {
			// Format timetable according to rules
			const timetable: Timetable = formatTimetable(json);

			res.send(timetable);
		});
});

export { timetablesRouter };
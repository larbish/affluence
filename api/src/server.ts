import * as bodyParser from 'body-parser';
import * as express from 'express';
import { connect } from './mongo';
import { timetablesRouter } from './timetables/timetables';

const cors = require('cors');

const app = express();
const port = 3000;

async function startserver(): Promise<void> {
	// Cors origin, can be more specific
	app.use(cors());
	app.use(bodyParser.json());
	
	// Connect to MongoDB
	// tslint:disable-next-line:no-any
	await connect({ url: 'mongodb://mongodb:27017/affluence'});

	app.use('/timetables', timetablesRouter);
	
	app.get('/', async (req: express.Request, res: express.Response) => {
		  res.send('affluence-api');
	});
	
	app.get('/ping', async (req: express.Request, res: express.Response) => {
		  res.send('pong');
	});
	
	app.listen(port, () => {
		console.log(`App listening at http://localhost:${port}`);
	});
}

startserver();

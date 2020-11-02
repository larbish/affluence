import { Db, MongoClient, ObjectID } from 'mongodb';

let db: Db;

async function connect(mongo: { url: string }): Promise<void> {
    // tslint:disable-next-line:no-console
    console.log(`Connecting to ${mongo.url}...`);
	db = (await MongoClient.connect(mongo.url)).db();
	// tslint:disable-next-line:no-console
	console.log(`Connected to ${mongo.url} !`);
}

function get(): Db {
    return db;
}

// tslint:disable-next-line:no-any
function mapObjectIdToStringHex<T>(obj: any): any {
	Object.keys(obj).forEach((key) => {
		if (obj[key] && typeof obj[key] === 'object' && !(obj[key] instanceof ObjectID)) {
			mapObjectIdToStringHex(obj[key]);
		} else if (obj[key] instanceof ObjectID) {
			obj[key] = (obj[key] as ObjectID).toHexString();
		}
	});
	return obj;
}

export {
	connect,
    get,
	mapObjectIdToStringHex
};
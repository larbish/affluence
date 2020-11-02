import { Collection, Db, FindAndModifyWriteOpResultObject, InsertOneWriteOpResult, OptionalId, WithId } from 'mongodb';
import { get, mapObjectIdToStringHex } from '../mongo';
import { Timetable } from './timetables.model';

export class TimetablesService {
	constructor() {}

	public async insertOne(timetable: Timetable, userId: string): Promise<Timetable> {
		if (!timetable) return timetable;

		timetable.objectInfos = {
			creation: {
				userId,
				date: new Date(),
			}
		};

		const mongoRes: InsertOneWriteOpResult<OptionalId<Timetable>> = await get().collection('timetables').insertOne(timetable);

		return mapObjectIdToStringHex(mongoRes.ops[0]);
	}

	public async updateOne(timetable: Partial<Timetable>, userId: string): Promise<Timetable> {
		if (!timetable) return timetable;

		const updateQuery: { [id: string]: object } = {
			$set: {
				...timetable,
				'objectInfos.lastUpdate': {
					userId,
					date: new Date()
				},		
			}
		};

		const mongoRes: FindAndModifyWriteOpResultObject<Timetable> = await get().collection('timetables').findOneAndUpdate(
			{ 'objectInfos.creation.userId': userId },
			updateQuery,
			{ returnOriginal: false }
		);

		return mapObjectIdToStringHex(mongoRes.value);
	}

	public async findOneByUserId(userId: string): Promise<Timetable | null> {
		const mongoRes: Timetable | null = await get().collection('timetables').findOne({ 'objectInfos.creation.userId': userId });

		if (!mongoRes) return null;

		return mapObjectIdToStringHex(mongoRes);
	}
}

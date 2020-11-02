export declare class UpdateInfos {
	date: Date;
	userId: string;
}

export declare class ObjectInfos {
    creation: UpdateInfos;
    lastUpdate?: UpdateInfos;
}

export interface MongoObject {
	_id?: string;
    objectInfos?: ObjectInfos;
}
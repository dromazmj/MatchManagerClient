import { MetaDataBase } from './meta-data-base.model';

export class MetaDataBaseObject extends MetaDataBase {
    constructor(
        public uid: string,
        public name: string,
        public description: string,
        public displayName: string,
        public primaryKey: string,
    ) {
        super(uid, name, description, displayName, primaryKey);
    }
}
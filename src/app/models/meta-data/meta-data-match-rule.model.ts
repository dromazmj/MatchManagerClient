import { MetaDataBase } from './meta-data-base.model';

export class MetaDataMatchRule extends MetaDataBase {
    constructor(
        public uid: string,
        public name: string,
        public description: string,
        public displayName: string,
        public primaryKey: string,
        public matchColumnUids: string[]
    ) {
        super(uid, name, description, displayName, primaryKey);
    }
}
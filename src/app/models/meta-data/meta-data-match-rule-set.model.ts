import { MetaDataBase } from './meta-data-base.model';
import { MetaDataMatchRule } from './meta-data-match-rule.model';

export class MetaDataMatchRuleSet extends MetaDataBase {
    constructor(
        public uid: string,
        public name: string,
        public description: string,
        public displayName: string,
        public primaryKey: string,
        public matchRules: MetaDataMatchRule[],
        public searchLevel: string,
    ) {
        super(uid, name, description, displayName, primaryKey);
    }
}
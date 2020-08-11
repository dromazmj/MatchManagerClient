import { DataTableInformation } from './data-table-information.model';
import { MatchedRecord } from './matched-record.model';
import { MetaDataMatchRule } from '../meta-data/meta-data-match-rule.model';
import { MetaDataMatchRuleSet } from '../meta-data/meta-data-match-rule-set.model';
import { MatchCandidate } from './match-candidate.model';

export class DataTablePagination {
    constructor(
        public dataTableInformation: DataTableInformation,
        public searchToken: string,
        public sourceRowids: string[],
        public joinUids: string[],
        public matchedRecords: MatchedRecord[],
        public columns: string[],
        public matchCandidates: MatchCandidate[],
        public metaDataMatchRuleSet: MetaDataMatchRuleSet,
        public metaDataMatchRule: MetaDataMatchRule,
        public siperianObjectUid: string
    ) { }
}
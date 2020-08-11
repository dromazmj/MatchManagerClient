import { Record } from './record.model';

export class MatchCandidate {
    constructor(
        public sourceRowid: string,
        public matchedRowids: string[],
        public sourceRecord: Record,
        public matchedRecords: Record[]
    ) {}
}
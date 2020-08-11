import { Record } from './record.model';

export class MatchedRecord {
    constructor(
        public record: Record,
        public matchedRecord: Record
    ) {}
}
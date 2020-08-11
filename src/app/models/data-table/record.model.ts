import { Field } from './field.model';

export class Record {
    constructor(
        public fields: Field[],
    ) { }
}
import { MColumnComponent } from './mcolumncomponent.model';

export class MColumn {
    constructor(rowidColumn: string) {
        this.rowidColumn = rowidColumn;
    }
    rowidColumn: string;
    mcolumnComponents: MColumnComponent[];

}
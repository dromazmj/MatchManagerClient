import { MColumnComponent } from './mcolumncomponent.model';

export class MColumn {
    constructor(rowidMcolumn: string) {
        this.rowidMcolumn = rowidMcolumn;
    }
    rowidMcolumn: string;
    mcolumnComponents: MColumnComponent[];

}
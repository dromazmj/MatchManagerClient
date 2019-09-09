import { MMatchReport } from './mmatchreport.model';
import { MColumn } from './mcolumn.model';

export class MColumnComponent {
    constructor(mColumn: MColumn) {
        this.mcolumn = mColumn;
    }
    rowidColumnComponent: number;
    mmatchReport: MMatchReport;
    mcolumn: MColumn;
}
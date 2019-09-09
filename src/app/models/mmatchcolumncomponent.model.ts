import { MMatchReport } from './mmatchreport.model';
import { MMatchColumn } from './mmatchcolumn.model';

export class MMatchColumnComponent {
    constructor(mMatchColumn: MMatchColumn) {
        this.mmatchColumn = mMatchColumn;
    }
    rowidMatchColumnComponent: number;
    mmatchReport: MMatchReport;
    mmatchColumn : MMatchColumn;
}
import { MMatchReport } from './mmatchreport.model';
import { MColumn } from './mcolumn.model';
import { MColumnComponentKey } from './keys/mcolumncomponentkey.model';

export class MColumnComponent {
    constructor(mColumn: MColumn) {
        this.mcolumnComponentKey = new MColumnComponentKey();
        this.mcolumnComponentKey.rowidMcolumn = mColumn.rowidMcolumn;
    }
    mcolumnComponentKey: MColumnComponentKey;
}
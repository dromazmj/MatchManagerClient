import { MMatchReport } from './mmatchreport.model';
import { MMatchColumn } from './mmatchcolumn.model';
import { MMatchColumnComponentKey } from './keys/mmatchcolumncomponentkey.model';

export class MMatchColumnComponent {
    constructor(mmatchColumn: MMatchColumn) {
        this.mmatchColumnComponentKey = new MMatchColumnComponentKey();
        this.mmatchColumnComponentKey.rowidMmatchColumn = mmatchColumn.rowidMmatchColumn;
    }
    mmatchColumnComponentKey: MMatchColumnComponentKey;
}
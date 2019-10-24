import { MMatchColumnComponent } from './mmatchcolumncomponent.model';

export class MMatchColumn {

    constructor(rowidMmatchColumn: string) {
        this.rowidMmatchColumn = rowidMmatchColumn;
    }

    rowidMmatchColumn: string;
    mmatchColumnComponents: MMatchColumnComponent[];
}
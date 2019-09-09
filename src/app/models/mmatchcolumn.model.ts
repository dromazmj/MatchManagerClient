import { MMatchColumnComponent } from './mmatchcolumncomponent.model';

export class MMatchColumn {

    constructor(rowidMatchColumn: string) {
        this.rowidMatchColumn = rowidMatchColumn;
    }

    rowidMatchColumn: string;
    mmatchColumnComponents: MMatchColumnComponent[];
}
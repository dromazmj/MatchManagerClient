import { Column } from './column.model';

export class DataTableInformation {
    constructor(
        public draw: number,
        public data: any,
        public recordsTotal: number,
        public recordsFiltered: number,
        public columns: Column[]
    ) { }
}
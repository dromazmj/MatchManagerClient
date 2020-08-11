import { Search } from './search.model';

export class Column {
    constructor(
        public data: any,
        public name: string,
        public orderable: boolean,
        public searchable: boolean,
        public search: Search
    ) {

    }
}
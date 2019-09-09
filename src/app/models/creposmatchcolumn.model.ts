import { CReposColumn } from './creposcolumn.model';

export class CReposMatchColumn {
    rowidMatchColumn: string;
    matchColumnName: string;
    fuzzyInd: number;
    creposColumns: CReposColumn[];
}
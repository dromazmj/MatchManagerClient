import { CReposMatchSet } from './creposmatchset.model';
import { CReposColumn } from './creposcolumn.model';

export class CReposTable {
    constructor() {
        this.creposMatchSets = [];
        this.creposColumns = [];
    }

    rowidTable: string;
    tableName: string;
    shortName: string;
    displayName: string;
    creposMatchSets: CReposMatchSet[];
    creposColumns : CReposColumn[];
}
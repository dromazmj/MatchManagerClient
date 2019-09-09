import { CReposMatchRule } from './creposmatchrule.model';

export class CReposMatchSet {
    rowidMatchSet: string;
    tableName: string;
    matchSetName: string;
    defaultInd: string;
    matchSetDesc: string;
    searchLevelStr: string;
    searchMatchSetInd: string;
    rulesetFilterInd: string;
    rulesetFilterSQL: string;
    creposMatchRules: CReposMatchRule[];
}
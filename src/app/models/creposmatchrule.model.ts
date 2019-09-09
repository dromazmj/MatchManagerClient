import { CReposMatchRuleComponent } from './creposmatchrulecomponent.model';

export class CReposMatchRule {
    rowidMatchRule : string;
    ruleNo : string;
    automergeInd : string;
    ruleEnabledInd : string;
    matchPurposeStr : string;
    matchLevelStr : string;
    exactRuleInd : string;
    ruleAcceptLimitAdjustment : string;
    creposMatchRuleComps :CReposMatchRuleComponent[];
}
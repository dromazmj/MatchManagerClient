import { MMatchColumnComponent } from './mmatchcolumncomponent.model';
import { MColumnComponent } from './mcolumncomponent.model';

export class MMatchReport {
    rowidMatchReport: number;
    rowidTable: string;
    rowidMatchSet: string;
    rowidMatchRule: string;
    matchReportName: string;
    rowidUser: string;

    mmatchColumnComponents: MMatchColumnComponent[];
    mcolumnComponents: MColumnComponent[];
}
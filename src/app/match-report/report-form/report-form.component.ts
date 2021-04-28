import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CReposMatchRule } from 'src/app/models/creposmatchrule.model';
import { CReposMatchSet } from 'src/app/models/creposmatchset.model';
import { CReposTable } from 'src/app/models/crepostable.model';
import { MMatchReport } from 'src/app/models/mmatchreport.model';
import { CReposTableService } from 'src/app/shared/CReposTable/crepos-table.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.sass']
})
export class ReportFormComponent implements OnInit {
  @Output() createReportEvent: EventEmitter<any> = new EventEmitter<any>();

  creposTables : CReposTable[];
  creposMatchSets : CReposMatchSet[];
  creposMatchRules : CReposMatchRule[];

  selectedTable : CReposTable = new CReposTable();
  selectedMatchSet : CReposMatchSet = new CReposMatchSet();
  selectedMatchRule : CReposMatchRule = new CReposMatchRule();

  updatingReport: boolean = false;


  constructor(
    private creposTableService: CReposTableService,
  ) { }

  ngOnInit(): void {
    this.getBOCReposTables();
  }

  createReport() {
    let mMatchReport = new MMatchReport();
    mMatchReport.rowidMatchRule = this.selectedMatchRule.rowidMatchRule;
    mMatchReport.rowidTable = this.selectedTable.rowidTable;
    mMatchReport.rowidMatchSet = this.selectedMatchSet.rowidMatchSet;

    this.createReportEvent.next(mMatchReport);
  }

  public getBOCReposTables() {
    this.creposTableService.getAllBOCReposTablesWithMatchRows().subscribe(data => {
      this.creposTables = data;
    });
  }

  
  public showMatchRuleSets(cReposTable) {
    this.selectedTable = cReposTable;
    this.creposMatchRules = [];
    this.creposMatchSets = cReposTable['creposMatchSets'];
  }

  public showMatchRules(cReposMatchSet) {
    this.selectedMatchSet = cReposMatchSet;
    this.creposMatchRules = cReposMatchSet['creposMatchRules'];
  }

}

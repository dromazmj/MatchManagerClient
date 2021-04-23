import { Component, OnInit } from '@angular/core';
import { CReposMatchRule } from 'src/app/models/creposmatchrule.model';
import { CReposMatchSet } from 'src/app/models/creposmatchset.model';
import { CReposTable } from 'src/app/models/crepostable.model';
import { CReposTableService } from 'src/app/shared/CReposTable/crepos-table.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.sass']
})
export class ReportFormComponent implements OnInit {
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

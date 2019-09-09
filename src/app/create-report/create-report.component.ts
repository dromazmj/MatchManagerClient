import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CReposTableService } from './../shared/CReposTable/crepos-table.service';
import { CReposTable } from './../models/crepostable.model';
import { CReposMatchSet } from './../models/creposmatchset.model';
import { CReposMatchRule } from './../models/creposmatchrule.model';
import { CReposColumn } from './../models/creposcolumn.model';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CReposMatchColumn } from './../models/creposmatchcolumn.model';
import { MMatchReport } from '../models/mmatchreport.model';
import { MMatchReportService } from '../shared/MMatchReport/mmatch-report.service';
import { MMatchColumn } from '../models/mmatchcolumn.model';
import { MColumn } from '../models/mcolumn.model';
import { MColumnComponent } from '../models/mcolumncomponent.model';
import { MMatchColumnComponent } from '../models/mmatchcolumncomponent.model';
import { AuthenticationService } from '../_service/authentication/authentication.service';


@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {

  creposTables : CReposTable[];
  creposMatchSets : CReposMatchSet[];
  creposMatchRules : CReposMatchRule[];
  creposColumns : CReposColumn[] = [];
  creposMatchColumns : CReposMatchColumn[] = [];

  selectedTable : CReposTable = new CReposTable();
  selectedMatchSet : CReposMatchSet = new CReposMatchSet();
  selectedMatchRule : CReposMatchRule = new CReposMatchRule();
  selectedColumns : CReposColumn[] = [];
  selectedMatchColumns : CReposMatchColumn[] = [];
  matchColumnColumns: CReposColumn[] = [];


  @ViewChild(DataTableDirective) 
  dtElement: DataTableDirective;
  @ViewChild('matchReportName') matchReportName: ElementRef;

  @Input() mMatchReport: MMatchReport;

  dtOptions: DataTables.Settings = {};
  tTrigger: Subject<any> = new Subject();

  savedMatchReport: MMatchReport = new MMatchReport();
  
  rows: any;
  columns: any;

  constructor(
    private creposTableService: CReposTableService,
    private mMatchReportService: MMatchReportService,
    private authenticationService: AuthenticationService
    
  ) { }

  ngOnInit() {
    console.log(this.authenticationService.currentUserValue)
    this.creposTableService.getBO().subscribe(data => {
      this.creposTables = data;
      if (this.mMatchReport == undefined) {
        this.mMatchReport = new MMatchReport();
      } else {
        this.setFormFields();
      }
      this.mMatchReportService.getAllMatchReportServices().subscribe(data => {
        console.log(data);
      })
    });
    this.tTrigger.next();
  }

  protected setFormFields() {
    this.setSelectedBaseObject();
    this.matchReportName.nativeElement.value = this.mMatchReport.matchReportName;
  }

  protected setSelectedBaseObject() {
    
    this.creposTables.forEach(creposTable => {
      if (creposTable.rowidTable == this.mMatchReport.rowidTable) {
        this.selectedTable = creposTable;
      }
    })
    this.setSelectedColumnsFromReport();
  }

  protected setSelectedColumnsFromReport() {
    this.creposColumns = this.selectedTable.creposColumns;
    this.mMatchReport.mcolumnComponents.forEach(mcolumnComponent => {
        this.selectedTable.creposColumns.forEach(creposColumn => {
          console.log(creposColumn.rowidColumn + ":" + mcolumnComponent.mcolumn.rowidColumn);
          if (creposColumn.rowidColumn == mcolumnComponent.mcolumn.rowidColumn) {
            this.selectedColumns.push(creposColumn);
          }
        })
    })
    this.setSelectedMatchSetFromReport();
  }

  protected setSelectedMatchSetFromReport() {
    this.creposMatchSets = this.selectedTable.creposMatchSets;
    this.selectedTable.creposMatchSets.forEach(creposMatchSet => {
      if (this.mMatchReport.rowidMatchSet == creposMatchSet.rowidMatchSet) {
        this.selectedMatchSet = creposMatchSet;
      }
    })
    this.setSelectedMatchRuleFromReport();
  }

  protected setSelectedMatchRuleFromReport() {
    this.creposMatchRules = this.selectedMatchSet.creposMatchRules;
    this.selectedMatchSet.creposMatchRules.forEach(creposMatchRule => {
      if (this.mMatchReport.rowidMatchRule == creposMatchRule.rowidMatchRule) {
        this.selectedMatchRule = creposMatchRule;
      }
    });
    this.setSelectedMatchColumnsFromReport();
  }

  protected setSelectedMatchColumnsFromReport() {
    this.selectedMatchRule.creposMatchRuleComps.forEach(creposMatchRuleComp => {
      this.creposMatchColumns.push(creposMatchRuleComp.creposMatchColumn);
    });

    this.mMatchReport.mmatchColumnComponents.forEach(mmatchColumnComponent => {
        this.selectedMatchRule.creposMatchRuleComps.forEach(creposMatchRuleComp => {
          if (creposMatchRuleComp.creposMatchColumn.rowidMatchColumn == mmatchColumnComponent.mmatchColumn.rowidMatchColumn) {
            this.selectedMatchColumns.push(creposMatchRuleComp.creposMatchColumn);
          }
        })
    })
  }

  onSelectMatchRule(event) {
    console.log(event.source.value);
    let matchColumns = [];
    event.source.value['creposMatchRuleComps'].forEach(creposMatchRuleComp => {
      console.log(creposMatchRuleComp.creposMatchColumn);
      matchColumns.push(creposMatchRuleComp.creposMatchColumn);
    });
    this.creposMatchColumns = matchColumns;
    console.log(this.creposMatchColumns);
  }

  public showMatchRuleSets(cReposTable) {
    this.selectedTable = cReposTable;
    this.creposMatchRules = [];
    this.creposMatchSets = cReposTable['creposMatchSets'];
    this.creposColumns = cReposTable['creposColumns'];
  }

  public showMatchRules(cReposMatchSet) {
    this.selectedMatchSet = cReposMatchSet;
    this.creposMatchRules = cReposMatchSet['creposMatchRules'];
  }

  public showMatchColumns(cReposMatchRule) {
    this.selectedMatchRule = cReposMatchRule;
    let matchColumns = [];
    cReposMatchRule['creposMatchRuleComps'].forEach(creposMatchRuleComp => {
      matchColumns.push(creposMatchRuleComp['creposMatchColumn']);
    });
    this.creposMatchColumns = matchColumns;
  }

  public setSelectedColumns(selectedColumns) {
    this.selectedColumns = selectedColumns;
  }

  public setSelectedMatchColumns(selectedMatchColumns) {
    this.selectedMatchColumns = selectedMatchColumns;
  }

  public previewReport() {
    let cols = [];
    let matchCols = "";
    if (this.selectedColumns != undefined) this.selectedColumns.forEach((column) => {cols.push(column.columnName)});
    if (this.selectedMatchColumns != undefined) this.selectedMatchColumns.forEach((column) => {matchCols += column.rowidMatchColumn + ','});

    matchCols = matchCols.substring(0, matchCols.length-1);
    this.creposTableService.getMatchDataWithMatchCol(this.selectedTable['tableName'], this.selectedMatchRule['rowidMatchRule'], cols, matchCols).subscribe(data => {
      this.rows = data['data'];
      this.columns = data['columns'];
      if (this.dtElement.dtInstance == undefined) {
        this.tTrigger.next();
      }
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.tTrigger.next();
      });

    })
  }

  protected saveReport() {
    if (this.validateAllInput() == false) {
      return;
    }

    this.setSavedMatchReport();
    console.log(this.savedMatchReport);

    this.mMatchReportService.postMatchReportService(this.savedMatchReport).subscribe(mMatchReport => {
        if (mMatchReport == undefined) {
          alert("Error Submitting Match Report. Please contact your system administrator.");
        } else {
          alert("Match Report saved successfully.");
          location.reload();
        }
    });
  }

  private setSavedMatchReport() {
    this.savedMatchReport.mmatchColumnComponents = [];
    this.savedMatchReport.mcolumnComponents = [];
    console.log(this.mMatchReport.rowidMatchReport);
    if (this.mMatchReport.rowidMatchReport != undefined) {this.savedMatchReport.rowidMatchReport = this.mMatchReport.rowidMatchReport; }

    this.savedMatchReport.rowidUser = this.authenticationService.currentUserValue.rowidUser;
    this.savedMatchReport.matchReportName = this.matchReportName.nativeElement.value;
    this.savedMatchReport.rowidTable = this.selectedTable.rowidTable;
    this.savedMatchReport.rowidMatchRule = this.selectedMatchRule.rowidMatchRule;
    this.savedMatchReport.rowidMatchSet = this.selectedMatchSet.rowidMatchSet;

    let tempMatchCols = new Array();
    this.selectedMatchColumns.forEach(selectedMatchColumn => {tempMatchCols.push(new MMatchColumn(selectedMatchColumn.rowidMatchColumn))});

    if (this.mMatchReport.mmatchColumnComponents != undefined) {
      this.mMatchReport.mmatchColumnComponents.forEach(mmatchColumnComponent => {
        tempMatchCols.forEach(tempMatchCol => {
          if (mmatchColumnComponent.mmatchColumn.rowidMatchColumn == tempMatchCol.rowidMatchColumn) {
            console.log("Match Column Found");
            this.savedMatchReport.mmatchColumnComponents.push(mmatchColumnComponent);
            tempMatchCols.splice(tempMatchCols.indexOf(tempMatchCol), 1);
          }
        })
      });
    }
    tempMatchCols.forEach(matchColumn => {this.savedMatchReport.mmatchColumnComponents.push(new MMatchColumnComponent(new MMatchColumn(matchColumn.rowidMatchColumn)))});

    let tempCols = new Array();
    this.selectedColumns.forEach(selectedColumn => {tempCols.push(new MColumn(selectedColumn.rowidColumn))});

    if (this.mMatchReport.mcolumnComponents != undefined) {
      this.mMatchReport.mcolumnComponents.forEach(mcolumnComponent => {
        tempCols.forEach(tempCol => {
          if (mcolumnComponent.mcolumn.rowidColumn == tempCol.rowidColumn) {
            this.savedMatchReport.mcolumnComponents.push(mcolumnComponent);
            tempCols.splice(tempCols.indexOf(tempCol), 1);
          }
        })
      });
    }
    tempCols.forEach(column => {this.savedMatchReport.mcolumnComponents.push(new MColumnComponent(new MColumn(column.rowidColumn)))});
  }

  protected validateAllInput() {
    if (this.matchReportName.nativeElement.value == '') {
      alert("Please enter a display name");
      return false;
    }
    this.selectedColumns.forEach(selectedColumn => {
      this.selectedMatchColumns.forEach(selectedMatchColumn => {
        selectedMatchColumn.creposColumns.forEach(creposColumn => {
          if (selectedColumn.columnName == creposColumn.columnName) {
            alert("Cannot select match columns with columns that have already been selected");
            return false;
          }
        })
      })
    })
    return true;
  }
}
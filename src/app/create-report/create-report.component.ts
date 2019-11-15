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
import { MColumnService } from '../shared/MColumn/m-column.service';
import { MColumnComponentService } from '../shared/MColumnComponent/m-column-component.service';
import { MMatchColumnService } from '../shared/MMatchColumn/m-match-column.service';
import { MMatchColumnComponentService } from '../shared/MMatchColumnComponent/m-match-column-component.service';
import { Ng4LoadingSpinnerComponent, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PeriodicElement } from '../match-report/match-report.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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

  updatingReport: boolean = false;


  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('matchReportName', {static: false}) matchReportName: ElementRef;
  @Input() mMatchReport: MMatchReport;

  dtOptions: any = {};
  tTrigger: Subject<any> = new Subject();

  savedMatchReport: MMatchReport = new MMatchReport();
  
  rows: any;
  columns: any;

  constructor(
    private creposTableService: CReposTableService,
    private mMatchReportService: MMatchReportService,
    private authenticationService: AuthenticationService,
    private spinner: Ng4LoadingSpinnerService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
        'pdf'
      ],
      colReorder: {
        order: [],
      },
      drawCallback: (row: Node, data: any[] | Object, index: number) => {
        this.spinner.hide();
      },
      responsive: true
    };
    this.spinner.show();
    this.getBOCReposTables();
  }

  public getBOCReposTables() {
    this.creposTableService.getBOCReposTables().subscribe(data => {
      this.spinner.hide();
      this.creposTables = data;
      if (this.mMatchReport == undefined) {
        this.mMatchReport = new MMatchReport();
      } else {
        this.setFormFields();
      }
    });
  }


  public setFormFields() {
    this.updatingReport = true;
    this.setSelectedBaseObject();
    this.matchReportName.nativeElement.value = this.mMatchReport.matchReportName;
  }

  public setSelectedBaseObject() {
    
    this.creposTables.forEach(creposTable => {
      if (creposTable.rowidTable == this.mMatchReport.rowidTable) {
        this.selectedTable = creposTable;
      }
    })
    this.setSelectedColumnsFromReport();
  }

  public setSelectedColumnsFromReport() {
    this.creposColumns = this.selectedTable.creposColumns;
    this.mMatchReport.mcolumnComponents.forEach(mcolumnComponent => {
        this.selectedTable.creposColumns.forEach(creposColumn => {
          if (creposColumn.rowidColumn == mcolumnComponent.mcolumnComponentKey.rowidMcolumn) {
            this.selectedColumns.push(creposColumn);
          }
        })
    })
    this.setSelectedMatchSetFromReport();
  }

  public setSelectedMatchSetFromReport() {
    this.creposMatchSets = this.selectedTable.creposMatchSets;
    this.selectedTable.creposMatchSets.forEach(creposMatchSet => {
      if (this.mMatchReport.rowidMatchSet == creposMatchSet.rowidMatchSet) {
        this.selectedMatchSet = creposMatchSet;
      }
    })
    this.setSelectedMatchRuleFromReport();
  }

  public setSelectedMatchRuleFromReport() {
    this.creposMatchRules = this.selectedMatchSet.creposMatchRules;
    this.selectedMatchSet.creposMatchRules.forEach(creposMatchRule => {
      if (this.mMatchReport.rowidMatchRule == creposMatchRule.rowidMatchRule) {
        this.selectedMatchRule = creposMatchRule;
      }
    });
    this.setSelectedMatchColumnsFromReport();
  }

  public setSelectedMatchColumnsFromReport() {
    this.selectedMatchRule.creposMatchRuleComps.forEach(creposMatchRuleComp => {
      this.creposMatchColumns.push(creposMatchRuleComp.creposMatchColumn);
    });

    this.mMatchReport.mmatchColumnComponents.forEach(mmatchColumnComponent => {
        this.selectedMatchRule.creposMatchRuleComps.forEach(creposMatchRuleComp => {
          if (creposMatchRuleComp.creposMatchColumn.rowidMatchColumn == mmatchColumnComponent.mmatchColumnComponentKey.rowidMmatchColumn) {
            this.selectedMatchColumns.push(creposMatchRuleComp.creposMatchColumn);
          }
        });
    });
  }

  onSelectMatchRule(event) {
    let matchColumns = [];
    event.source.value['creposMatchRuleComps'].forEach(creposMatchRuleComp => {
      matchColumns.push(creposMatchRuleComp.creposMatchColumn);
    });
    this.creposMatchColumns = matchColumns;
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
      console.log(data);
      this.rows = data['data'];
      this.columns = data['columns'];
      let i = 0;
      this.dtOptions.colReorder.order = [];
      this.columns.forEach(element => {
        this.dtOptions.colReorder.order.push(i);
        i++;
      });
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



  public saveReport() {
    if (this.validateAllInput() == false) {
      return;
    }

    this.setSavedMatchReport();

    if (this.updatingReport) {
      this.mMatchReportService.putMatchReportService(this.savedMatchReport).subscribe(mMatchReport =>  {
        if (mMatchReport == undefined) {
          alert("Error Submitting Match Report. Please contact your system administrator.");
        } else {
          alert("Match Report saved successfully.");
          // location.reload();
          this.modalService.dismissAll("SUCCESS");
          
        }
      })
    } else {
      this.mMatchReportService.postMatchReportService(this.savedMatchReport).subscribe(mMatchReport => {
        if (mMatchReport == undefined) {
          alert("Error Submitting Match Report. Please contact your system administrator.");
        } else {
          alert("Match Report saved successfully.");
          // location.reload();
          this.modalService.dismissAll("SUCCESS");
        }
    });
    }
  }


  private setSavedMatchReport() {
    this.savedMatchReport.mmatchColumnComponents = [];
    this.savedMatchReport.mcolumnComponents = [];
    this.setSavedMMatchReportAttributes();
    this.setMMatchColumnComponents();
    this.setMColumnComponents();
    console.log(this.savedMatchReport);
  }

  private setSavedMMatchReportAttributes() {
    if (this.mMatchReport.rowidMatchReport != undefined) {this.savedMatchReport.rowidMatchReport = this.mMatchReport.rowidMatchReport; }

    this.savedMatchReport.rowidUser = this.authenticationService.currentUserValue.rowidUser;
    this.savedMatchReport.matchReportName = this.matchReportName.nativeElement.value;
    this.savedMatchReport.rowidTable = this.selectedTable.rowidTable;
    this.savedMatchReport.rowidMatchRule = this.selectedMatchRule.rowidMatchRule;
    this.savedMatchReport.rowidMatchSet = this.selectedMatchSet.rowidMatchSet;
  }

  private setMMatchColumnComponents() {
    let tempMatchCols = new Array();
    this.selectedMatchColumns.forEach(selectedMatchColumn => {tempMatchCols.push(new MMatchColumn(selectedMatchColumn.rowidMatchColumn))});

    if (this.mMatchReport.mmatchColumnComponents != undefined) {
      this.mMatchReport.mmatchColumnComponents.forEach(mmatchColumnComponent => {
        tempMatchCols.forEach(tempMatchCol => {
          if (mmatchColumnComponent.mmatchColumnComponentKey.rowidMmatchColumn == tempMatchCol.rowidMmatchColumn) {
            console.log("Match Column Found");
            this.savedMatchReport.mmatchColumnComponents.push(mmatchColumnComponent);
            tempMatchCols.splice(tempMatchCols.indexOf(tempMatchCol), 1);
          }
        })
      });
    }
    tempMatchCols.forEach(matchColumn => {this.savedMatchReport.mmatchColumnComponents.push(new MMatchColumnComponent(new MMatchColumn(matchColumn.rowidMmatchColumn)))});
  }

  private setMColumnComponents() {
    let tempCols = new Array();

    this.selectedColumns.forEach(selectedColumn => {tempCols.push(new MColumn(selectedColumn.rowidColumn))});

    if (this.mMatchReport.mcolumnComponents != undefined) {
      this.mMatchReport.mcolumnComponents.forEach(mcolumnComponent => {
        tempCols.forEach(tempCol => {
          if (mcolumnComponent.mcolumnComponentKey.rowidMcolumn == tempCol.rowidMcolumn) {
            this.savedMatchReport.mcolumnComponents.push(mcolumnComponent);
            tempCols.splice(tempCols.indexOf(tempCol), 1);
          }
        })
      });
    }
    console.log(tempCols);
    tempCols.forEach(column => {this.savedMatchReport.mcolumnComponents.push(new MColumnComponent(new MColumn(column.rowidMcolumn)))});
  }

  private setDtOptions() {
    
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
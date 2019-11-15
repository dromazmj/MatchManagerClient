import { Component, OnInit, ViewChild } from '@angular/core';
import { CReposTableService } from '../shared/CReposTable/crepos-table.service';
import { CReposTable } from '../models/crepostable.model';
import { CReposMatchSet } from '../models/creposmatchset.model';
import { CReposMatchRule } from '../models/creposmatchrule.model';
import { MatchRowService } from '../shared/MatchRow/match-row.service';
import { MatchRow } from '../models/matchrow.model';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // BARCHART ATTRIBUTES

  // Number of cards to be generated with column and rows to be covered  
  tiles: Tile[] = [
    {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  public chartDatasets: Array<any> = [{data: [], label:["Match Rule Bar Chart"]}];  
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [{backgroundColor: [], borderColor: [], borderWidth: 2 }];
  barChartheading: string = '';

  isLoadingResults: boolean = false;

  // DATATABLE ATTRIBUTES
  cols: [{
    title: "Table",
    data: 'creposTable'
  }, {
    title: " Match Set",
    data: 'creposMatchSet'
  }, {
    title: "Match Rule",
    data: 'creposMatchRule',
  }, {
    title: "Num Matches",
    data: 'numMatches'
  }]

  // rows: any = [{'creposTable': '', 'creposMatchSet': '', 'creposMatchRule': '', 'numMatches': ''}];
  rows: any;

  @ViewChild(DataTableDirective, {static: false}) 
  dtElement: DataTableDirective;

  dtOptions: any = {};
  tTrigger: Subject<any> = new Subject();

  // PAGE ATTRIBUTES

  constructor(
    private creposTableService: CReposTableService,
    private matchRowService: MatchRowService,
    private spinner: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.isLoadingResults = true;
    this.creposTableService.getAllMatchTableData().subscribe(matchTablesData => {
      this.setBarChartData(matchTablesData);
      this.spinner.hide();
    });
    this.setDatatableData();
    this.tTrigger.next();
  }

  private setDatatablesOptions() {
    this.cols = [{
      title: "Table",
      data: 'creposTable'
    }, {
      title: " Match Set",
      data: 'creposMatchSet'
    }, {
      title: "Match Rule",
      data: 'creposMatchRule',
    }, {
      title: "Num Matches",
      data: 'numMatches'
    }]
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
        'pdf'
      ]
    };
  }

  private setBarChartData(matchTablesData) {
    let newChartDatasets = [{data: [], label:["Number of Matches Per Match Table"]}];  
    let newChartColors = [{backgroundColor: [], borderColor: [], borderWidth: 2 }];
    let newChartlabels = [];
    matchTablesData.forEach(element => {
      newChartDatasets[0].data.push(element['count']);
      newChartColors[0].backgroundColor.push(this.getRandomColor());
      newChartColors[0].borderColor.push(this.getRandomColor());
      newChartlabels.push(element['matchTableName']);
      
    });
    this.chartDatasets = newChartDatasets;
    this.chartColors = newChartColors;
    this.chartLabels = newChartlabels;
  }

  private getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async setDatatableData() {
    let rows = [];
    let creposTables = <CReposTable[]>await this.getBOTables();
    await creposTables.forEach(async (creposTable: CReposTable) => {
      if (creposTable.creposMatchSets.length > 0) {
        await creposTable.creposMatchSets.forEach(async (creposMatchSet: CReposMatchSet) => {        
          if (creposMatchSet.creposMatchRules.length > 0) {
            await creposMatchSet.creposMatchRules.forEach(async (creposMatchRule: CReposMatchRule) => {
              let row = {'creposTable': creposTable.tableName, 'creposMatchSet': '', 'creposMatchRule': '', 'numMatches': 0};
              row.creposMatchRule = creposMatchRule.ruleNo + ` : ${creposMatchRule.matchPurposeStr} (${creposMatchRule.matchLevelStr})`;
              let matchRows = <MatchRow[]>await this.getMatchRowsByMatchRule(creposTable.rowidTable, creposMatchRule.rowidMatchRule);
              row.numMatches = matchRows.length;
              row.creposMatchSet = creposMatchSet.matchSetName;
              rows.push(row);
            });
          }
        });
      }
    });
    this.isLoadingResults = false;
    this.setDatatablesOptions();
    this.rows = rows;
    if (this.dtElement.dtInstance == undefined) {
      this.tTrigger.next();
    }
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.tTrigger.next();
    });
  }

  async getBOTables() {
    return new Promise(resolve => {
      this.creposTableService.getBOCReposTables().subscribe((creposTables: CReposTable[]) => {
        resolve(creposTables);
      })
    })
  }

  private async getMatchRowsByMatchRule(rowidTable: string, rowidMatchRule: string) {
    return new Promise(resolve => {
      this.matchRowService.getMatchRowsByMatchRule(rowidTable, rowidMatchRule).subscribe((matchRows: MatchRow[]) => {
        resolve(matchRows);
      })
    })
  }

  private initDtOptions() {
    this.tTrigger.next();

    this.dtOptions = {
      // Use this attribute to enable the responsive extension
      // responsive: true
    };
  }

  private initTable() {
    // if (this.dtElement.dtInstance == undefined) {
    //   this.tTrigger.next();
    // }
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.tTrigger.next();
    });
  }
}

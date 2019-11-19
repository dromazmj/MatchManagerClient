import { Component, ViewChild, OnInit } from '@angular/core';
import { CReposTableService } from './../shared/CReposTable/crepos-table.service';
import { CReposTable } from './../models/crepostable.model';
import { CReposMatchSet } from './../models/creposmatchset.model';
import { CReposMatchRule } from './../models/creposmatchrule.model';
import { CReposColumn } from './../models/creposcolumn.model';
import { CReposMatchColumn } from './../models/creposmatchcolumn.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MMatchReportService } from '../shared/MMatchReport/mmatch-report.service';
import { MMatchReport } from '../models/mmatchreport.model';
import { ChartsModule } from 'angular-bootstrap-md';
import { MatchRowService } from '../shared/MatchRow/match-row.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
];


@Component({
  selector: 'app-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.scss']
})
export class MatchReportComponent implements OnInit {

  cReposTables : CReposTable[];
  cReposMatchSets : CReposMatchSet[];
  cReposMatchRules : CReposMatchRule[];
  cReposColumns : CReposColumn[];
  cReposMatchColumns : CReposMatchColumn[];

  selectedTable : CReposTable;
  selectedMatchSet : CReposMatchSet;
  selectedMatchRule : CReposMatchRule;
  selectedColumns : CReposColumn[];
  selectedMatchColumns : CReposMatchColumn[];

  rows: any = [];
  columns: any = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  displayedColumns: string[] = [];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: PeriodicElement[] = ELEMENT_DATA;
  dataSource = new MatTableDataSource(this.data);
  isLoadingResults: boolean = false;



  public pieChartDatasets: Array<any> = [
    { data: [], label: 'My First dataset' }
  ];

  public chartDatasets: Array<any> = [{data: [], label:["Match Rule Bar Chart"]}];  

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [{backgroundColor: [], borderColor: [], borderWidth: 2 }];

  barChartheading: string = '';
  pieChartheading: string = '';


  constructor(
    private cReposTableService: CReposTableService,
    private mMatchReportService: MMatchReportService,
    private matchRowService: MatchRowService,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  public showMatchReport(mMatchReport: MMatchReport) {
    this.isLoadingResults = true;
    this.barChartheading = mMatchReport.matchReportName + " Bar Chart"
    this.pieChartheading = mMatchReport.matchReportName + " Pie Chart"
    this.mMatchReportService.getMatchReportData(mMatchReport.rowidMatchReport).subscribe(data => {

      this.rows = data['data'];
      this.columns = data['columns'];
      this.displayedColumns = this.columns;
      this.setupMatchData();

    });

    let rowidMatchSet = mMatchReport.rowidMatchSet;
    this.matchRowService.getAllMatchRulesChartData(mMatchReport.rowidTable, rowidMatchSet).subscribe(matchRuleChartData => {
      this.setBarChartOptions(matchRuleChartData);
    });

    this.matchRowService.getMatchRuleChartData(mMatchReport.rowidTable, mMatchReport.rowidMatchRule).subscribe(matchRuleChartData => {
      this.pieChartDatasets = [{data: [matchRuleChartData.matchRuleMatchCount, matchRuleChartData.totalMatchRuleCount]}];
    })
    
  }

  private setupMatchData() {
    let data = [];
    this.rows.forEach((row, i) => {
      let newRow = {};
      row.forEach((element, j) => {
        newRow[this.columns[j]] = element;
      });
      data.push(newRow);
    });
    this.columnsToDisplay = this.columns.slice();
    this.data = data;
    this.dataSource.data = this.data;
    this.dataSource.sort = this.sort;
    this.isLoadingResults = false;
  }

  private setBarChartOptions(matchRuleChartData) {
    let newChartDatasets = [{data: [], label:["Match Rule Bar Chart"]}];  
    let newChartColors = [{backgroundColor: [], borderColor: [], borderWidth: 2 }];
    let newChartlabels = []; 
    matchRuleChartData.forEach(element => {
      //Only show bars that have a match results
      if (element['value']>0) {
        newChartDatasets[0].data.push(element['value']);
        newChartColors[0].backgroundColor.push(this.getRandomColor());
        newChartColors[0].borderColor.push(this.getRandomColor());
        newChartlabels.push(element['barName']);
      }
      
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

  public showMatchRuleSets(cReposTable) {
    this.selectedTable = cReposTable;
    this.cReposMatchRules = [];
    this.cReposMatchSets = cReposTable['creposMatchSets'];
    this.cReposColumns = cReposTable['creposColumns'];
  }

  public showMatchRules(cReposMatchSet) {
    this.selectedMatchSet = cReposMatchSet;
    this.cReposMatchRules = cReposMatchSet['creposMatchRules'];
    this.mMatchReportService.putMatchReportService(this.selectedMatchRule).subscribe((data) => {

    })
  }

  public showMatchColumns(cReposMatchRule) {
    this.selectedMatchRule = cReposMatchRule;
    let matchColumns = [];
    cReposMatchRule['creposMatchRuleComps'].forEach(creposMatchRuleComp => {
      matchColumns.push(creposMatchRuleComp['creposMatchColumn']);
    });
    this.cReposMatchColumns = matchColumns;
  }

  public setSelectedColumns(selectedColumns) {
    this.selectedColumns = selectedColumns;
  }

  public setSelectedMatchColumns(selectedMatchColumns) {
    this.selectedMatchColumns = selectedMatchColumns;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

import { Component, ViewChild, OnInit } from '@angular/core';
import { CReposTableService } from './../shared/CReposTable/crepos-table.service';
import { CReposTable } from './../models/crepostable.model';
import { CReposMatchSet } from './../models/creposmatchset.model';
import { CReposMatchRule } from './../models/creposmatchrule.model';
import { CReposColumn } from './../models/creposcolumn.model';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CReposMatchColumn } from './../models/creposmatchcolumn.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MMatchReportService } from '../shared/MMatchReport/mmatch-report.service';
import { MMatchReport } from '../models/mmatchreport.model';
import { ChartsModule } from 'angular-bootstrap-md';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatchRowService } from '../shared/MatchRow/match-row.service';
@Component({
  selector: 'app-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.scss']
})
export class MatchReportComponent implements OnInit {

  title = 'Match 360';
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

  @ViewChild(DataTableDirective) 
  dtElement: DataTableDirective;

  dtOptions: any = {};
  tTrigger: Subject<any> = new Subject();

  rows: any;
  columns: any;
  public pieChartDatasets: Array<any> = [
    { data: [], label: 'My First dataset' }
  ];

public chartDatasets: Array<any> = [{data: [], label:["Match Rule Bar Chart"]}];  
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
  // ];

  public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Red1', 'Blue2', 'Yellow3', 'Green4', 'Purple5'];

  public chartColors: Array<any> = [{backgroundColor: [], borderColor: [], borderWidth: 2 }];

  barChartheading: string = '';
  pieChartheading: string = '';
    // {
    //   backgroundColor: [
    //     'rgba(255, 99, 132, 0.2)',
    //     'rgba(54, 162, 235, 0.2)',
    //     'rgba(255, 206, 86, 0.2)',
    //     'rgba(75, 192, 192, 0.2)',
    //     'rgba(153, 102, 255, 0.2)',
    //     'rgba(255, 159, 64, 0.2)'
    //   ],
    //   borderColor: [
    //     'rgba(255,99,132,1)',
    //     'rgba(54, 162, 235, 1)',
    //     'rgba(255, 206, 86, 1)',
    //     'rgba(75, 192, 192, 1)',
    //     'rgba(153, 102, 255, 1)',
    //     'rgba(255, 159, 64, 1)'
    //   ],
    //   borderWidth: 2,
    // }];


  constructor(
    private cReposTableService: CReposTableService,
    private mMatchReportService: MMatchReportService,
    private matchRowService: MatchRowService,
    private spinner: Ng4LoadingSpinnerService
  ) { }

  ngOnInit() {
    this.cReposTableService.getBO().subscribe(data => {
      console.log(data);
      this.cReposTables = data;
    });
    this.tTrigger.next();
    this.setDatatablesOptions();
  }

  private setDatatablesOptions() {
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

  ngOnChanges() {
    
  }

  private showMatchReport(mMatchReport: MMatchReport) {
    this.spinner.show();
    this.barChartheading = mMatchReport.matchReportName + " Bar Chart"
    this.pieChartheading = mMatchReport.matchReportName + " Pie Chart"
    this.mMatchReportService.getMatchReportData(mMatchReport.rowidMatchReport).subscribe(data => {
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
        this.spinner.hide();
      });

    })
    let rowidMatchSet = mMatchReport.rowidMatchSet;
    console.log(rowidMatchSet);
    this.matchRowService.getAllMatchRulesChartData(mMatchReport.rowidTable, rowidMatchSet).subscribe(matchRuleChartData => {
      this.setBarChartOptions(matchRuleChartData);
    });

    this.matchRowService.getMatchRuleChartData(mMatchReport.rowidTable, mMatchReport.rowidMatchRule).subscribe(matchRuleChartData => {
      this.pieChartDatasets = [{data: [matchRuleChartData.matchRuleMatchCount, matchRuleChartData.totalMatchRuleCount]}];
    })
    
  }

  private setBarChartOptions(matchRuleChartData) {
    let newChartDatasets = [{data: [], label:["Match Rule Bar Chart"]}];  
    let newChartColors = [{backgroundColor: [], borderColor: [], borderWidth: 2 }];
    let newChartlabels = []; 
    matchRuleChartData.forEach(element => {
      newChartDatasets[0].data.push(element['value']);
      newChartColors[0].backgroundColor.push(this.getRandomColor());
      newChartColors[0].borderColor.push(this.getRandomColor());
      newChartlabels.push(element['barName']);
      
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

  public showMatchTable() {
    
    let cols = [];
    let matchCols = "";
    if (this.selectedColumns != undefined) this.selectedColumns.forEach((column) => {cols.push(column['columnName'])});
    if (this.selectedMatchColumns != undefined) this.selectedMatchColumns.forEach((column) => {matchCols += column['rowidMatchColumn'] + ','});

    matchCols = matchCols.substring(0, matchCols.length-1);
    this.cReposTableService.getMatchDataWithMatchCol(this.selectedTable['tableName'], this.selectedMatchRule['rowidMatchRule'], cols, matchCols).subscribe(data => {
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

  public setSelectedColumns(selectedColumns) {
    this.selectedColumns = selectedColumns;
  }

  public setSelectedMatchColumns(selectedMatchColumns) {
    this.selectedMatchColumns = selectedMatchColumns;
  }
}

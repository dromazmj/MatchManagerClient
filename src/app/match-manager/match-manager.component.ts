import { Component, OnInit, ViewChild } from '@angular/core';
import { UrlService } from '../_service/url/url.service';
import { DataTablePagination } from '../models/data-table/data-table-pagination.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTableInformation } from '../models/data-table/data-table-information.model';
import { MatchCandidate } from '../models/data-table/match-candidate.model';
import { Column } from '../models/data-table/column.model';
import { Field } from '../models/data-table/field.model';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-match-manager',
  templateUrl: './match-manager.component.html',
  styleUrls: ['./match-manager.component.scss']
})
export class MatchManagerComponent implements OnInit {

  public matchCandidates: any;

    // NEW TABLE

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  public dtOptions: any = {};

  public columns: any = [{data: "ROWID_OBJECT"}];
  public rows: any = [];

  public searchToken: string = "-1";

  loadTable:boolean = true;

  loading: boolean = true;

  constructor(
    private urlService: UrlService,
    private http: HttpClient
  ) { }

  // "BASE_OBJECT.C_PARTY",
                // "MATCH_RULE_SET.C_PARTY|IDL", "MATCH_RULE.C_PARTY|IDL|6"

  ngOnInit() {
    const that = this;


    let siperianObjectUid="BASE_OBJECT.C_PARTY";
    let matchRuleSetUid="MATCH_RULE_SET.C_PARTY%7CIDL";
    let matchRuleUid = "MATCH_RULE.C_PARTY%7CIDL%7C6"

    console.log("HERE");
    this.dtOptions = {
      pagingType: 'full_numbers',
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'colvis',
        'print',
        'excel',
      ],
      pageLength: 10,
      serverSide: true,
      responsive: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablePagination>(
            `${this.urlService.getLocalUrl()}/match-candidate-pagination?siperianObjectUid=${siperianObjectUid}&matchRuleSetUid=${matchRuleSetUid}&matchRuleUid=${matchRuleUid}&searchToken=${this.searchToken}`,
            dataTablesParameters, {}
          ).subscribe(resp => {
            console.log(resp);
            // this.formatTableDataFromServer(resp);
            // this.render();
            // this.columns = resp.columns;
            // this.rows = resp.dataTableInformation.data;
            this.loading = false;
            callback({
              recordsTotal: resp.dataTableInformation.recordsTotal,
              recordsFiltered: resp.dataTableInformation.recordsFiltered,
              data: this.formatTableDataFromServer(resp)
            });
          });
      },
      columns: this.columns
    };
  }

  private render(): void {
    if (this.dtElement.dtInstance == undefined) {
      this.dtTrigger.next();
    } else {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }
  }

  public formatTableDataFromServer(dataTablePagination: DataTablePagination) {
    let rows = [];
    let dtOptionsRows = [];
    dataTablePagination.matchCandidates.forEach((matchCandidate: MatchCandidate) => {
      let row = [];
      let dtOptionsRow = {};
      dtOptionsRow['ROWID_OBJECT']="";
      dataTablePagination.dataTableInformation.columns.forEach((column: Column) => {
        let field;
        matchCandidate.sourceRecord.fields.forEach((sourceRecordField: Field) => {
          if (sourceRecordField.name == column.name.split('|')[column.name.split('|').length-1]) {
            field = sourceRecordField;
          }
        });
        if (field) {
          if (field.value) {
            row.push(field.value);
            dtOptionsRows[field.name] = field.value;
          } else {
            dtOptionsRows[column.name.split('|')[column.name.split('|').length-1]] = "NOT AVAILABLE";
            row.push("NOT AVAILABLE");
          }
        }
      });
      dataTablePagination.dataTableInformation.columns.forEach((column: Column) => {
        let field;
        matchCandidate.matchedRecords[0].fields.forEach((sourceRecordField: Field) => {
          if (sourceRecordField.name == column.name.split('|')[column.name.split('|').length-1]) {
            field = sourceRecordField;
          }
        });
        if (field) {
          if (field.value) {
            dtOptionsRows[field.name + "_MATCH"] = field.value;
            row.push(field.value);
          } else {
            dtOptionsRows[column.name.split('|')[column.name.split('|').length-1] + "_MATCH"] = "NOT AVAILABLE";
            row.push("NOT AVAILABLE");
          }
        }
      });
      dtOptionsRows.push(dtOptionsRow);
      rows.push(row);
    });

    let columns = [];

    dataTablePagination.dataTableInformation.columns.forEach((column: Column) => {
      columns.push({data: column.name.split('|')[column.name.split('|').length-1], title: column.name});
    });
    dataTablePagination.dataTableInformation.columns.forEach((column: Column) => {
      columns.push({data: column.name.split('|')[column.name.split('|').length-1] + "_MATCH", title: column.name + "_MATCH"});
    });

    this.setDtOptionsColumns(dataTablePagination);
    this.columns = columns;
    console.log(columns);
    console.log(this.columns);
    this.rows = rows;
    return dtOptionsRows;
  }

  public setDtOptionsColumns(dataTablePagination: DataTablePagination) {
    let columns = [];

    dataTablePagination.dataTableInformation.columns.forEach((column: Column) => {
      let dtColumn = {};
      dtColumn['title'] = column.name.split('|')[column.name.split('|').length-1];
      dtColumn['data'] = column.name;
      dtColumn['class'] = 'none';
      columns.push(dtColumn);
    });
    dataTablePagination.dataTableInformation.columns.forEach((column: Column) => {
      let dtColumn = {};
      dtColumn['title'] = column.name.split('|')[column.name.split('|').length-1] + "_MATCH";
      dtColumn['data'] = column.name;
      dtColumn['class'] = 'none';
      columns.push(dtColumn);
    });
    this.dtOptions.columns = columns;
  }


}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  @Input() rows: any = [{'creposTable': '', 'creposMatchSet': '', 'creposMatchRule': '', 'numMatches': ''}];
  @Input() cols: any = [];

  @ViewChild(DataTableDirective, {static: false}) 
  dtElement: DataTableDirective;

  dtOptions: any = {};
  tTrigger: Subject<any> = new Subject();

  constructor() { }

  ngOnInit() {
    this.tTrigger.next();
    this.initDtOptions();
    this.initTable();
  }

  private initDtOptions() {
    this.dtOptions = {
      data: this.rows,
      columns: this.cols,
      // Use this attribute to enable the responsive extension
      responsive: true
    };
  }

  initTable() {
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

}

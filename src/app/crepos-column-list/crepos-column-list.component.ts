import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CReposColumn } from '../models/creposcolumn.model';
import { CReposMatchColumn } from '../models/creposmatchcolumn.model';

@Component({
  selector: 'app-crepos-column-list',
  templateUrl: './crepos-column-list.component.html',
  styleUrls: ['./crepos-column-list.component.scss']
})
export class CReposColumnListComponent implements OnInit {
  @Input() cReposColumns: CReposColumn[];
  @Input() cReposMatchColumns: CReposMatchColumn[];
  @Output() setSelectedColumnsEvent = new EventEmitter<CReposColumn[]>();
  @Output() setSelectedMatchColumnsEvent = new EventEmitter<CReposMatchColumn[]>();
  selection = [];
  selectionMatchColumn = [];

  constructor() { }

  ngOnInit() {
  }

  toggleSelection(columnName) {
    var idx = this.selection.indexOf(columnName);

    // Is currently selected
    if (idx > -1) {
      this.selection.splice(idx, 1);
    }
    // Is newly selected
    else {
      this.selection.push(columnName);
    }

    this.setSelectedColumnsEvent.next(this.selection);
  };

  toggleMatchSelection(matchColumn) {
    var idx = this.selectionMatchColumn.indexOf(matchColumn);

    // Is currently selected
    if (idx > -1) {
      this.selectionMatchColumn.splice(idx, 1);
    }
    // Is newly selected
    else {
      this.selectionMatchColumn.push(matchColumn);
    }

    this.setSelectedMatchColumnsEvent.next(this.selectionMatchColumn);
  }
}

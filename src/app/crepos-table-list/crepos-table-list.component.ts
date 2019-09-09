import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CReposTableService } from '../shared/CReposTable/crepos-table.service';
import { CReposTable } from '../models/crepostable.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crepos-table-list',
  templateUrl: './crepos-table-list.component.html',
  styleUrls: ['./crepos-table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CReposTableListComponent implements OnInit {
  @Output() someEvent = new EventEmitter<CReposTable>();

  @Input() cReposTables: CReposTable[];

  constructor(private cReposTableService: CReposTableService) { }

  ngOnInit() {
    
  }

  showMatchRuleSets(cReposTable) {
    this.someEvent.next(cReposTable);
  }

}

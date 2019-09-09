import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CReposMatchSet } from '../models/creposmatchset.model';

@Component({
  selector: 'app-crepos-match-set-list',
  templateUrl: './crepos-match-set-list.component.html',
  styleUrls: ['./crepos-match-set-list.component.scss']
})
export class CReposMatchSetListComponent implements OnInit {
  @Output() showMatchRulesEvent = new EventEmitter<CReposMatchSet>();
  @Input() cReposMatchSets: CReposMatchSet[];
  
  constructor() { }

  ngOnInit() {
  }

  showMatchRules(cReposMatchSet) {
    this.showMatchRulesEvent.next(cReposMatchSet);
  }

}

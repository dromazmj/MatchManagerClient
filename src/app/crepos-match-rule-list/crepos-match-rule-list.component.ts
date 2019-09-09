import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CReposMatchRule } from '../models/creposmatchrule.model';

@Component({
  selector: 'app-crepos-match-rule-list',
  templateUrl: './crepos-match-rule-list.component.html',
  styleUrls: ['./crepos-match-rule-list.component.scss']
})
export class CReposMatchRuleListComponent implements OnInit {
  @Input() cReposMatchRules: CReposMatchRule[];
  @Output() showMatchColumnsEvent = new EventEmitter<CReposMatchRule>();
  constructor() { }

  ngOnInit() {
  }

  showMatchColumns(cReposMatchRule) {
    this.showMatchColumnsEvent.next(cReposMatchRule);
  }
}

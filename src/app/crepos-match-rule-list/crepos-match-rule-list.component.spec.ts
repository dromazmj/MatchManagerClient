import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CReposMatchRuleListComponent } from './crepos-match-rule-list.component';

describe('CReposMatchRuleListComponent', () => {
  let component: CReposMatchRuleListComponent;
  let fixture: ComponentFixture<CReposMatchRuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CReposMatchRuleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CReposMatchRuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

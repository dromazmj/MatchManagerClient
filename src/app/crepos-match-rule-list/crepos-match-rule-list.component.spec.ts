import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CReposMatchRuleListComponent } from './crepos-match-rule-list.component';

describe('CReposMatchRuleListComponent', () => {
  let component: CReposMatchRuleListComponent;
  let fixture: ComponentFixture<CReposMatchRuleListComponent>;

  beforeEach(waitForAsync(() => {
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

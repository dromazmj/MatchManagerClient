import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaDataMatchRuleSetComponent } from './meta-data-match-rule-set.component';

describe('MetaDataMatchRuleSetComponent', () => {
  let component: MetaDataMatchRuleSetComponent;
  let fixture: ComponentFixture<MetaDataMatchRuleSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaDataMatchRuleSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaDataMatchRuleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MetaDataMatchRuleComponent } from './meta-data-match-rule.component';

describe('MetaDataMatchRuleComponent', () => {
  let component: MetaDataMatchRuleComponent;
  let fixture: ComponentFixture<MetaDataMatchRuleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaDataMatchRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaDataMatchRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

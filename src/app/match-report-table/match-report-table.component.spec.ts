import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportTableComponent } from './match-report-table.component';

describe('MatchReportTableComponent', () => {
  let component: MatchReportTableComponent;
  let fixture: ComponentFixture<MatchReportTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

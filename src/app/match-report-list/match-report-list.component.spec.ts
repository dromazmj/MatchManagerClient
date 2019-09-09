import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReportListComponent } from './match-report-list.component';

describe('MatchReportListComponent', () => {
  let component: MatchReportListComponent;
  let fixture: ComponentFixture<MatchReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

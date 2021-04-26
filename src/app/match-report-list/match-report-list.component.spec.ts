import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchReportListComponent } from './match-report-list.component';

describe('MatchReportListComponent', () => {
  let component: MatchReportListComponent;
  let fixture: ComponentFixture<MatchReportListComponent>;

  beforeEach(waitForAsync(() => {
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

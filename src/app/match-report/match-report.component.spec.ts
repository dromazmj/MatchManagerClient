import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchReportComponent } from './match-report.component';

describe('MatchReportComponent', () => {
  let component: MatchReportComponent;
  let fixture: ComponentFixture<MatchReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

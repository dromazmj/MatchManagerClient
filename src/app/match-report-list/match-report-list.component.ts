import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CreateReportComponent } from '../create-report/create-report.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MMatchReportService } from '../shared/MMatchReport/mmatch-report.service';
import { MMatchReport } from '../models/mmatchreport.model';
import { AuthenticationService } from '../_service/authentication/authentication.service';
@Component({
  selector: 'app-match-report-list',
  templateUrl: './match-report-list.component.html',
  styleUrls: ['./match-report-list.component.scss']
})
export class MatchReportListComponent implements OnInit {
  mMatchReports: MMatchReport[];
  selectedMatchReport: MMatchReport;

  @Output() someEvent = new EventEmitter<MMatchReport>();

  constructor(
    private modalService: NgbModal,
    private mMatchReportService: MMatchReportService  ,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.mMatchReportService.getAllMatchReportServicesByUserId(this.authenticationService.currentUserValue.rowidUser).subscribe(mMatchReports => {
      this.mMatchReports = mMatchReports;
    })
  }

  openCreateMatchReportModal(content) {
    const createMatchReportConfig = this.modalService.open(content, {size: 'lg'}).result.then((result) => {

    }, (reason) => {

    })
  }

  updateMatchReport(content) {
    this.openCreateMatchReportModal(content);
  }

  createMatchReport(content) {
    this.selectedMatchReport = undefined;
    this.openCreateMatchReportModal(content);
  }

  protected setSelectedMatchReport(mMatchReport) {
    this.selectedMatchReport = mMatchReport;
  }

  protected showMatchReport(mMatchReport) {
    this.someEvent.next(this.selectedMatchReport);
  }

  protected deleteMatchReport() {
    this.mMatchReportService.deleteMatchReportService(this.selectedMatchReport.rowidMatchReport).subscribe(result => {
      location.reload();
    }, () => {
      alert("ERROR deleting Match Report. Please contact system admin.");
    })
  }

}

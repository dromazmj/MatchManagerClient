import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CreateReportComponent } from '../create-report/create-report.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MMatchReportService } from '../shared/MMatchReport/mmatch-report.service';
import { MMatchReport } from '../models/mmatchreport.model';
import { AuthenticationService } from '../_service/authentication/authentication.service';
import { SystemService } from '../shared/System/system.service';
@Component({
  selector: 'app-match-report-list',
  templateUrl: './match-report-list.component.html',
  styleUrls: ['./match-report-list.component.scss']
})
export class MatchReportListComponent implements OnInit {
  mMatchReports: MMatchReport[];
  selectedMatchReport: MMatchReport;

  @Output() someEvent = new EventEmitter<MMatchReport>();
  isLoadingResults: boolean = false;

  constructor(
    private modalService: NgbModal,
    private mMatchReportService: MMatchReportService  ,
    private authenticationService: AuthenticationService,
    private systemService: SystemService
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    // this.mMatchReportService.getAllMatchReportServicesByUserId(this.authenticationService.currentUserValue.rowidUser).subscribe(mMatchReports => {
    //   this.mMatchReports = mMatchReports;
    // })
    this.validateMMatchReports();
  }

  validateMMatchReports() {
    this.systemService.validateMMatchReports().subscribe(mMatchReports => {
      this.mMatchReports = mMatchReports;
      this.isLoadingResults = false;
    });
  }

  openCreateMatchReportModal(content) {
    const createMatchReportConfig = this.modalService.open(content, {size: 'lg'}).result.then((result) => {

    }, (reason) => {
        if (reason == "SUCCESS") {
          this.validateMMatchReports();
        }
    })
  }

  updateMatchReport(content) {
    if (this.selectedMatchReport == undefined) {
      alert("No Match Report Selected!"); return;
    } 
    this.openCreateMatchReportModal(content);
  }

  createMatchReport(content) {
    this.selectedMatchReport = undefined;
    this.openCreateMatchReportModal(content);
  }

  public setSelectedMatchReport(mMatchReport) {
    this.selectedMatchReport = mMatchReport;
  }

  public showMatchReport(mMatchReport) {
    this.someEvent.next(this.selectedMatchReport);
  }

  public deleteMatchReport(content) {
    if (this.selectedMatchReport == undefined) {
      alert("No Match Report Selected!"); return;
    } 
    this.mMatchReportService.deleteMatchReportService(this.selectedMatchReport.rowidMatchReport).subscribe(result => {
      location.reload();
    }, () => {
      alert("ERROR deleting Match Report. Please contact system admin.");
    })
  }

}

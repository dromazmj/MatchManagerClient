import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MMatchReport } from 'src/app/models/mmatchreport.model';
import { CReposMatchRule } from 'src/app/models/creposmatchrule.model';
import { MMatchColumnService } from '../MMatchColumn/m-match-column.service';
import { UrlService } from 'src/app/_service/url/url.service';

@Injectable({
  providedIn: 'root'
})
export class MMatchReportService {
  private localUrl: string = "//localhost:8088/match-manager-1/";

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.localUrl = this.urlService.getLocalUrl();
  }

  getAllMatchReportServices(): Observable<MMatchReport[]> {
    return this.http.get<MMatchReport[]>(this.localUrl + 'MMatchReport');
  }

  getAllMatchReportServicesByUserId(userId): Observable<MMatchReport[]> {
    return this.http.get<MMatchReport[]>(this.localUrl + `getAllMatchReportsByUser?userId=${userId}`);
  }

  putMatchReportService(mMatchReport): Observable<MMatchReport> {
    return this.http.put<MMatchReport>(this.localUrl + 'MMatchReport', mMatchReport);
  }

  saveWithRollbackWithChildren(mMatchReport: MMatchReport): Observable<MMatchReport> {
    return this.http.post<MMatchReport>(this.localUrl + "MMatchReportWithChildren", mMatchReport);
  }

  postMatchReportService(mMatchReport) {
    return this.http.post<MMatchReport>(this.localUrl + 'MMatchReport', mMatchReport);
  }

  deleteMatchReportService(mMatchReportRowid): Observable<any> {
    return this.http.delete<any>(this.localUrl + `MMatchReport/${mMatchReportRowid}`);
  }

  getMatchReportData(rowidMatchReport): Observable<any> {
    return this.http.get<any>(this.localUrl + `getMatchReportData?rowidMatchReport=${rowidMatchReport}`);
  }
  
  private getArgHeaders(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }
}

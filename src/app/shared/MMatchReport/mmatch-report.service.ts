import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MMatchReport } from 'src/app/models/mmatchreport.model';
import { CReposMatchRule } from 'src/app/models/creposmatchrule.model';
import { MMatchColumnService } from '../MMatchColumn/m-match-column.service';

@Injectable({
  providedIn: 'root'
})
export class MMatchReportService {

  constructor(private http: HttpClient) {
  }

  getAllMatchReportServices(): Observable<MMatchReport[]> {
    return this.http.get<MMatchReport[]>('//localhost:8034/MMatchReport');
  }

  getAllMatchReportServicesByUserId(userId): Observable<MMatchReport[]> {
    return this.http.get<MMatchReport[]>(`//localhost:8034/getAllMatchReportsByUser?userId=${userId}`);
  }

  putMatchReportService(mMatchReport): Observable<MMatchReport> {
    return this.http.put<MMatchReport>('//localhost:8034/MMatchReport', mMatchReport);
  }

  saveWithRollbackWithChildren(mMatchReport: MMatchReport): Observable<MMatchReport> {
    return this.http.post<MMatchReport>("//localhost:8034/MMatchReportWithChildren", mMatchReport);
  }

  postMatchReportService(mMatchReport) {
    return this.http.post<MMatchReport>('//localhost:8034/MMatchReport', mMatchReport);
  }

  deleteMatchReportService(mMatchReportRowid): Observable<any> {
    return this.http.delete<any>(`//localhost:8034/MMatchReport/${mMatchReportRowid}`);
  }

  getMatchReportData(rowidMatchReport): Observable<any> {
    return this.http.get<any>(`//localhost:8034/getMatchReportData?rowidMatchReport=${rowidMatchReport}`);
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

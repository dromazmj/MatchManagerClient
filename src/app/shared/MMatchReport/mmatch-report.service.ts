import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MMatchReport } from 'src/app/models/mmatchreport.model';
import { CReposMatchRule } from 'src/app/models/creposmatchrule.model';
import { MMatchColumnService } from '../MMatchColumn/m-match-column.service';
import { UrlService } from 'src/app/_service/url/url.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MMatchReportService {
  private localUrl: string;

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
    return this.http.get<any>(this.localUrl + `getMatchReportData?rowidMatchReport=${rowidMatchReport}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
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

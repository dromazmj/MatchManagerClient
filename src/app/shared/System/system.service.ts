import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MMatchReport } from 'src/app/models/mmatchreport.model';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  private localUrl = "http://localhost:8034";
  
  constructor(private http: HttpClient) { }

  public validateMMatchReports(): Observable<MMatchReport[]> {
    return this.http.get<MMatchReport[]>(this.localUrl + '/validate-match-reports');
  }
}

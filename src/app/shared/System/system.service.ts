import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MMatchReport } from 'src/app/models/mmatchreport.model';
import { UrlService } from 'src/app/_service/url/url.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  private localUrl: string;
  
  constructor(private http: HttpClient, private urlService: UrlService) {
    this.localUrl = this.urlService.getLocalUrl();
  }

  public validateMMatchReports(): Observable<MMatchReport[]> {
    return this.http.get<MMatchReport[]>(this.localUrl + 'validate-match-reports');
  }
}

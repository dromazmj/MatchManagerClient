import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/_service/url/url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchDataService {

  private url: string;

  constructor(private http: HttpClient,
    private urlService: UrlService  
  ) {
    this.url = urlService.getLocalUrl();
  }

  public getMatchData(rowidTable: string, rowidMatchRule: string): Observable<any> {
    rowidMatchRule = rowidMatchRule.replace(/ /g, '%20');
    return this.http.get<any>(this.url + `/match-data?rowidTable=${rowidTable}&rowidMatchRule=${rowidMatchRule}`);
  }

  public getMatchDataFromRowidMatchReport(rowidMatchReport: number): Observable<any> {
    return this.http.get<any>(this.url + `/match-data/match-report?rowidMatchReport=${rowidMatchReport}`);
  }
}

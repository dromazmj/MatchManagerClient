import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CReposTable } from 'src/app/models/crepostable.model';
import { MatchData } from 'src/app/models/matchdata.model';
import { MatchTableData } from 'src/app/models/matchtabledata.module';
import { UrlService } from 'src/app/_service/url/url.service';

@Injectable({
  providedIn: 'root'
})
export class CReposTableService {

  private localUrl: string;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.localUrl = this.urlService.getLocalUrl();
  }

  public getBOCReposTables(): Observable<CReposTable[]> {
    return this.http.get<CReposTable[]>(this.localUrl + '/getBOCReposTables');
  }

  public getAllBOCReposTablesWithMatchRows(): Observable<CReposTable[]> {
    return this.http.get<CReposTable[]>(this.localUrl + '/getAllBOCReposTablesWithMatchRows');
  }

  public getMatchData(table, rowidMatchRule, cols): Observable<MatchData> {
    return this.http.get<MatchData>(this.localUrl + `/getMatchData?table=${table}&rowidMatchRule=${rowidMatchRule}&cols=${cols.join(",")}`);

    // let params = new HttpParams();
    // params = params.set('table', table);
    // params = params.set('rowidMatchRule', rowidMatchRule);
    // params = params.append('cols', cols.join(', '));
    // return this.http.get<Object[]>("//localhost:8034/getMatchData", { params: params });
  }

  
  public getMatchDataWithMatchCol(table, rowidMatchRule, cols, matchCols): Observable<any> {
    return this.http.get<any>(this.localUrl + `/getMatchDataWithMatchCol?table=${table}&rowidMatchRule=${rowidMatchRule}&rowidMatchCols=${matchCols}&cols=${cols.join(",")}`);
  }

  public getAllMatchTableData(): Observable<MatchTableData[]> {
    return this.http.get<MatchTableData[]>(this.localUrl + `/getAllMatchTableData`);
  }
}



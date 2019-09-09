import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MMatchReport } from 'src/app/models/mmatchreport.model';
import { CReposMatchRule } from 'src/app/models/creposmatchrule.model';
import { MatchRuleChartData } from 'src/app/models/matchrulechartdata.model';
import { MatchRulesChartData } from 'src/app/models/matchruleschartdata.model';
import { MatchRow } from 'src/app/models/matchrow.model';

@Injectable({
  providedIn: 'root'
})
export class MatchRowService {

  constructor(private http: HttpClient) {

  }

  getMatchRuleChartData(rowidTableBO, rowidMatchRule): Observable<MatchRuleChartData> {
    return this.http.get<MatchRuleChartData>(`//localhost:8034/MatchTable/MatchRuleChartData?rowidTableBO=${rowidTableBO}&rowidMatchRule=${rowidMatchRule}`);
  }

  getAllMatchRulesChartData(rowidTableBO, rowidMatchSet): Observable<MatchRulesChartData[]> {
    rowidMatchSet = rowidMatchSet.replace(/ /g, '%20');
    return this.http.get<MatchRulesChartData[]>(`//localhost:8034/MatchTable/AllMatchRulesChartData?rowidTableBO=${rowidTableBO}&rowidMatchSet=${rowidMatchSet}`);
  }

  getMatchRowsByMatchRule(rowidTableBO, rowidMatchRule): Observable<MatchRow[]> {
    rowidMatchRule = rowidMatchRule.replace(/ /g, '%20');
    return this.http.get<MatchRow[]>(`//localhost:8034/matchRows/matchRule?rowidTableBO=${rowidTableBO}&rowidMatchRule=${rowidMatchRule}`);
  }
}
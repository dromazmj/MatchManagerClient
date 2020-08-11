import { HttpClient } from '@angular/common/http';
import { MColumn } from 'src/app/models/mcolumn.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/_service/url/url.service';


@Injectable({
    providedIn: 'root'
  })
export class MColumnService {

  private localUrl: string;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.localUrl = this.urlService.getLocalUrl();
  } 

  createMColumn(mColumn: MColumn): Observable<MColumn> {
    return this.http.post<MColumn>(this.localUrl + `/m-column`, mColumn);
  }
}
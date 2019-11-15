import { HttpClient } from '@angular/common/http';
import { MColumn } from 'src/app/models/mcolumn.model';
import { Observable } from 'rxjs';
import { MColumnComponent } from 'src/app/models/mcolumncomponent.model';
import { MMatchColumn } from 'src/app/models/mmatchcolumn.model';
import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/_service/url/url.service';


@Injectable({
    providedIn: 'root'
})
export class MMatchColumnService {

  private localUrl: string;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.localUrl = this.urlService.getLocalUrl();
  } 

  createMColumnComponent(mMatchColumn: MMatchColumn): Observable<MMatchColumn> {
    return this.http.post<MMatchColumn>(this.localUrl + `m-match-column`, mMatchColumn);
  }
}
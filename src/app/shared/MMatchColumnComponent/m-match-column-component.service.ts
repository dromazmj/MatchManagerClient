import { HttpClient } from '@angular/common/http';
import { MColumn } from 'src/app/models/mcolumn.model';
import { Observable } from 'rxjs';
import { MColumnComponent } from 'src/app/models/mcolumncomponent.model';
import { MMatchColumn } from 'src/app/models/mmatchcolumn.model';
import { MMatchColumnComponent } from 'src/app/models/mmatchcolumncomponent.model';
import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/_service/url/url.service';


@Injectable({
    providedIn: 'root'
})
export class MMatchColumnComponentService {

  private localUrl: string;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.localUrl = this.urlService.getLocalUrl();
  } 

  createMColumnComponent(mMatchColumnComponent: MMatchColumn): Observable<MMatchColumnComponent> {
    return this.http.post<MMatchColumnComponent>(this.localUrl + `/m-match-column-component`, mMatchColumnComponent);
  }
}
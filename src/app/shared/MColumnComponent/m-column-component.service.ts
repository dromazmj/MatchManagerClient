import { HttpClient } from '@angular/common/http';
import { MColumn } from 'src/app/models/mcolumn.model';
import { Observable } from 'rxjs';
import { MColumnComponent } from 'src/app/models/mcolumncomponent.model';
import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/_service/url/url.service';


@Injectable({
    providedIn: 'root'
})
export class MColumnComponentService {

  private localUrl: string;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.localUrl = this.urlService.getLocalUrl();
  } 

  createMColumnComponent(mColumnComponent: MColumnComponent): Observable<MColumnComponent> {
    return this.http.post<MColumnComponent>(this.localUrl + `/m-column-component`, mColumnComponent);
  }
}
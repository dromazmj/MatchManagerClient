import { HttpClient } from '@angular/common/http';
import { MColumn } from 'src/app/models/mcolumn.model';
import { Observable } from 'rxjs';
import { MColumnComponent } from 'src/app/models/mcolumncomponent.model';
import { MMatchColumn } from 'src/app/models/mmatchcolumn.model';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MMatchColumnService {

  constructor(private http: HttpClient) {} 

  createMColumnComponent(mMatchColumn: MMatchColumn): Observable<MMatchColumn> {
    return this.http.post<MMatchColumn>(`//localhost:8034/m-match-column`, mMatchColumn);
  }
}
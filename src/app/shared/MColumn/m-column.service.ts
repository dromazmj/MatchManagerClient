import { HttpClient } from '@angular/common/http';
import { MColumn } from 'src/app/models/mcolumn.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class MColumnService {

  constructor(private http: HttpClient) {} 

  createMColumn(mColumn: MColumn): Observable<MColumn> {
    return this.http.post<MColumn>(`//localhost:8034/m-column`, mColumn);
  }
}
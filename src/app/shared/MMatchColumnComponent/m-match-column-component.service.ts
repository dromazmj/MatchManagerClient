import { HttpClient } from '@angular/common/http';
import { MColumn } from 'src/app/models/mcolumn.model';
import { Observable } from 'rxjs';
import { MColumnComponent } from 'src/app/models/mcolumncomponent.model';
import { MMatchColumn } from 'src/app/models/mmatchcolumn.model';
import { MMatchColumnComponent } from 'src/app/models/mmatchcolumncomponent.model';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MMatchColumnComponentService {

  constructor(private http: HttpClient) {} 

  createMColumnComponent(mMatchColumnComponent: MMatchColumn): Observable<MMatchColumnComponent> {
    return this.http.post<MMatchColumnComponent>(`//localhost:8034/m-match-column-component`, mMatchColumnComponent);
  }
}
import { HttpClient } from '@angular/common/http';
import { MColumn } from 'src/app/models/mcolumn.model';
import { Observable } from 'rxjs';
import { MColumnComponent } from 'src/app/models/mcolumncomponent.model';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class MColumnComponentService {

  constructor(private http: HttpClient) {} 

  createMColumnComponent(mColumnComponent: MColumnComponent): Observable<MColumnComponent> {
    return this.http.post<MColumnComponent>(`//localhost:8034/m-column-component`, mColumnComponent);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiperianObject } from 'src/app/models/siperianobject.model';

@Injectable({
  providedIn: 'root'
})
export class SiperianObjectService {

  private localUrl = "http://localhost:8034"

  constructor(private http: HttpClient) { }

  public getSiperianObjects(username: string, password: string): Observable<SiperianObject[]> {
    return this.http.get<SiperianObject[]>(this.localUrl + `/siperianObjects?username=${username}&password=${password}`);
  }
  getPackageData(pkgName: string): Observable<any> {
    return this.http.get<any>(`//localhost:8034/packageData?pkgName=${pkgName}`);
  }
}

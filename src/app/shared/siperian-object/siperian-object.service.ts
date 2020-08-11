import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiperianObject } from 'src/app/models/siperianobject.model';
import { UrlService } from 'src/app/_service/url/url.service';

@Injectable({
  providedIn: 'root'
})
export class SiperianObjectService {

  private localUrl: string;

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.localUrl = this.urlService.getLocalUrl();
  }

  public getSiperianObjects(username: string, password: string): Observable<SiperianObject[]> {
    return this.http.get<SiperianObject[]>(this.localUrl + `/siperianObjects?username=${username}&password=${password}`);
  }
  getPackageData(pkgName: string): Observable<any> {
    return this.http.get<any>(this.localUrl + `/packageData?pkgName=${pkgName}`);
  }
}

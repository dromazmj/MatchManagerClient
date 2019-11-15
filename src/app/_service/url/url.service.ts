import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private localUrl: string = "http://localhost:8088/match-manager-1/";

  constructor() { }

  public getLocalUrl() { return this.localUrl; }
}

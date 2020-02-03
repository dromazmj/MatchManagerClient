import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private localUrl: string = "http://localhost:8088/";

  constructor() { }

  public getLocalUrl() { return this.localUrl; }
}

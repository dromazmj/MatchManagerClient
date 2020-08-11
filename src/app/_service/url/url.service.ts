import { Injectable } from '@angular/core';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private localUrl: string = "";

  constructor(
    private environmentService: EnvironmentService
  ) {
    this.localUrl = this.environmentService.apiUrl;
  }

  public getLocalUrl() { return this.localUrl; }
}

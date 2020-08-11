import { Component, OnInit } from '@angular/core';

declare const $:any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    // { path: '/createReport', title: 'Create Report', icon: 'dashboard', class: ''},
    { path: '/matchReport', title: 'Match Report', icon: 'dashboard', class: ''},
    { path: '/package-viewer', title: 'Package Viewer', icon: 'dashboard', class: ''},
    { path: '/match-manager', title: 'MatchManager', icon: 'dashboard', class: ''}

]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];


  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}

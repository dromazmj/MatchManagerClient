import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchReportComponent } from './match-report/match-report.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guard/auth.guard';
import { PackageViewerComponent } from './package-viewer/package-viewer.component';
import { MatchManagerComponent } from './match-manager/match-manager.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'createReport', component: CreateReportComponent, canActivate: [AuthGuard]},
  { path: 'matchReport', component: MatchReportComponent},
  { path: 'match-manager', component: MatchManagerComponent, canActivate: [AuthGuard]},
  { path: 'package-viewer', component: PackageViewerComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/match-manager', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

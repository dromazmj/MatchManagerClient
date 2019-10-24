import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule, MatGridListModule, MatButtonToggleModule, MatRippleModule, MatSelectModule, MatTableModule, MatPaginator, MatPaginatorModule, MatProgressSpinnerModule, MatFormFieldModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CReposTableService } from './shared/CReposTable/crepos-table.service';
import { CReposTableListComponent } from './crepos-table-list/crepos-table-list.component';
import { CReposMatchSetListComponent } from './crepos-match-set-list/crepos-match-set-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CReposMatchRuleListComponent } from './crepos-match-rule-list/crepos-match-rule-list.component';
import { CReposColumnListComponent } from './crepos-column-list/crepos-column-list.component';
import { MatchReportComponent } from './match-report/match-report.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { MatchReportListComponent } from './match-report-list/match-report-list.component';
import { NgModule } from '@angular/core';
import { ChartsModule, WavesModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './_service/jwt.interceptor';
import { PackageViewerComponent } from './package-viewer/package-viewer.component';
import { DatatableComponent } from './datatable/datatable.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DataTablesModule } from 'angular-datatables';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Browser } from 'protractor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CReposTableListComponent,
    CReposMatchSetListComponent,
    CReposMatchRuleListComponent,
    CReposColumnListComponent,
    MatchReportComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    CreateReportComponent,
    MatchReportListComponent,
    PieChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    LoginComponent,
    PackageViewerComponent,
    DatatableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatToolbarModule,
    MatRippleModule,
    MatGridListModule,
    ScrollingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    NgbModule,
    MatFormFieldModule,
    MatTableExporterModule,
    Ng4LoadingSpinnerModule,
    ChartsModule,
    DataTablesModule,
    WavesModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    CReposTableService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

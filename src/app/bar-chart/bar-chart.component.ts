import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  public chartType: string = 'bar';

  @Input() public chartDatasets: Array<any> = [];

  @Input() public chartLabels: Array<any> = [];

  @Input() public chartColors: Array<any> = [];

  @Input() heading: string = '';

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}

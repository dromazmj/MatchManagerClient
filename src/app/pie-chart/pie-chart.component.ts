import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  public chartType: string = 'pie';
  
  // public chartDatasets: Array<any> = [
  //   { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  // ];

  @Input() pieChartDatasets: Array<any> = [];

  public chartLabels: Array<any> = ['Match Rule Count', 'Total Matches'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1'],
      borderWidth: 2,
    }
  ];

  @Input() heading: string = '';


  public chartOptions: any = {
    responsive: true
  };

  ngOnInit() {
    
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}


import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-graficoDona',
  templateUrl: './graficoDona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input('ChartLabels') doughnutChartLabels: string[] = [];
  @Input('ChartData') doughnutChartData: number[] = [];
  @Input('ChartType') doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}

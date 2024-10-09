/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component,  ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ApexResponsive,
} from 'ng-apexcharts';
import { routes, SideBarService, ToasterService } from 'src/app/core/core.index';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment';
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  legend: ApexLegend | any;
  tooltip: ApexTooltip | any;
  responsive: ApexResponsive[] | any;
  fill: ApexFill | any;
  labels: string[] | any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public layoutPosition = '1';
  public routes = routes;
  public router  : Router;
  public total_rent  :any
  public total_receivable  :any
  public total_payable  :any
  user_type = localStorage.getItem('type')
  constructor(private sideBar: SideBarService, router : Router,public api : ApiService, public toastService : ToasterService) {

    this.router    = router;
    this.chartOptions = {
      series: [
        {
          name: 'Received',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
          colors: ['#7638ff'],
        },

        {
          name: 'Pending',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
      ],

      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
        colors: ['#7638ff', '#fda600'],
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    };
    this.chartOptions2 = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: 'donut',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
              height: 350,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    // <* to check layout position *>
    this.sideBar.layoutPosition.subscribe((res: any) => {
      this.layoutPosition = res;
    });
    // <* to check layout position *>
  }
  ngOnInit() {

    //  this.api.post('test_json.php?authToken=' + environment.authToken, null).then((data: any) =>
    //   {
    //     console.log(data)
    //   }).catch(error => { this.toastService.typeError('Something went wrong in Dashboard'); });

      this.api.get('mp_dashboard.php?authToken=' + environment.authToken).then((data: any) =>
          {

            this.total_rent       = data.total_rent_value
            this.total_receivable = data.total_receivables
            this.total_payable = data.total_payables
          }).catch(error => { this.toastService.typeError('Something went wrong in Dashboard'); });
  }
}

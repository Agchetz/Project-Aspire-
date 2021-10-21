import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { BaseService } from 'src/app/Shared/baseService';
import { ToastrService } from 'ngx-toastr';
import { orderDetailsModel, orderTestStatus } from 'src/app/Shared/interface';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public chartStatus = true;
  public myChart!: Chart;
  private temp_Chart!: Array<number>;
  public totalOrders!: number;

  constructor(private myservice: BaseService, private toastr: ToastrService) {
    this.loadChartData()
  }

  ngOnInit(): void { this.getTotalOrders() }

  loadChartData() {
    this.myservice.getOrderstatus().subscribe(
      (data) =>{
        let chartValues:orderTestStatus[] = data;
        let values = chartValues.map(data => data.total);
        let columns = chartValues.map(data => data._id);
        this.ChartData(values, columns);
      },
      (error) => { this.toastr.error(error.error.message, 'Error loading the Chart') }
    )}

  ChartData(values: number[], columns: string[]) {
    if (this.chartStatus) {
      this.myChart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: columns,
          datasets: [
            {
              label: 'Order Status ',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 3,
            },
          ],
        },
        options: {
          scales: {
            y: { beginAtZero: true},
          },
        },
      });
    }
  }

  getTotalOrders() {
    this.myservice.getOrder().subscribe(
      (data:orderDetailsModel[]) => {
        this.totalOrders = (data.length)
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error fetching total number of orders');
      }
    )}

}

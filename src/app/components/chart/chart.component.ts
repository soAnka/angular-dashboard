import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IDevice, IWidgetChart } from 'src/app/models/idevices';
import { SharedStateService } from 'src/app/services/shared-state.service';
import { SocketService } from 'src/app/services/socket.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  // state = inject(SharedStateService);
  // // devices: IDevice[] = this.state.devices();
  // chart!: Chart;
  // @Input() widget!: IWidgetChart;
  // @Input() name: string = '';
  // @Input() device!: IDevice;
  // @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  // constructor(private socket: SocketService) {
  //   effect(() => {
  //     const devices = this.socket.devices();
  //     if (!this.device) return;
  //     if (!this.chart) return;
  //     if (this.widget.chartType === 'doughnut') {
  //       const online = devices.filter((d) => d.status === 'online').length;
  //       const offline = devices.length - online;
  //       this.chart.data = {
  //         labels: ['Online', 'Offline'],
  //         datasets: [
  //           {
  //             data: [online, offline],
  //             backgroundColor: ['#14C886', '#A7E9D1'],
  //             borderColor: ['#14C886', '#A7E9D1'],
  //           },
  //         ],
  //       };
  //       this.chart.update('active');
  //       return;
  //     }
  //     const d = devices.find((x) => x.id === this.device.id);
  //     if (!d) return;
  //     this.chart.data.labels = d.widget.dataLabels;
  //     this.chart.data.datasets[0].data = d.widget.data;
  //     this.chart.data.datasets[0].borderColor = d.color;
  //     this.chart.data.datasets[0].backgroundColor = d.widget.color;
  //     if (d.widget.chartType == 'bar') {
  //       this.chart.data.datasets[0].backgroundColor = d.widget.color;
  //     }
  //     this.chart.update('active');
  //   });
  // }
  // doughnutDevicesData = computed(() => {
  //   const devices = this.socket.devices();
  //   return [
  //     devices.filter((d) => d.status === 'online').length,
  //     devices.filter((d) => d.status === 'offline').length,
  //   ];
  // });
  // ngAfterViewInit() {
  //   console.log('canvas:', this.canvas);
  //   console.log('device:', this.device);
  //   if (!this.device) return;
  //   const isLineChart = this.widget.chartType === 'line';
  //   this.chart = new Chart(this.canvas.nativeElement, {
  //     type: this.widget.chartType,
  //     data: {
  //       // labels: ['Red', 'Blue', 'Yellow', 'Green'],
  //       datasets: [
  //         {
  //           label: this.device.name,
  //           backgroundColor: this.device.widget.color,
  //           data: [12, 19, 3, 5, 2, 3],
  //           borderWidth: 1,
  //           borderColor: '',
  //           borderRadius: 1,
  //           pointRadius: isLineChart ? 2 : 0,
  //           pointHoverRadius: isLineChart ? 2 : 0,
  //           pointBackgroundColor: isLineChart
  //             ? this.device.widget.color
  //             : undefined,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       elements: {
  //         point: {
  //           radius: isLineChart ? 1 : 0,
  //         },
  //       },
  //       scales: {
  //         x: {
  //           min: 0,
  //           max: 20,
  //         },
  //         y: {
  //           min: -30,
  //           max: 30,
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }
  // updateChart() {
  //   const devices = this.socket.devices();
  //   const d = devices.find((x) => x.id === this.device.id);
  //   if (!this.chart || !this.device) return;
  //   this.chart.data.datasets[0].data = [...this.widget.data];
  //   this.chart.data.datasets[0].borderColor = this.device.widget.color;
  //   this.chart.data.datasets[0].backgroundColor = this.device.widget.color;
  //   this.chart.data.labels =
  //     this.device.widget.widgetType === 'chart'
  //       ? this.device.widget.dataLabels
  //       : [];
  //   if (this.widget.chartType === 'bar') {
  //     this.chart.data.datasets[0].backgroundColor = [
  //       'rgb(25,160,120)',
  //       'rgb(25,100,115)',
  //       'rgb(25,110,220)',
  //       'rgb(25,150,220)',
  //     ];
  //   }
  //   this.chart.update('active');
  // }
}

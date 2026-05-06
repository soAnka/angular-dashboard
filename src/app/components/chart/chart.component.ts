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
import { BaseWidget, IWidgetChart } from 'src/app/models/idevices';
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
  state = inject(SocketService);
  widgets: BaseWidget[] = this.state.widgets();
  chart!: Chart;
  @Input() widgetID!: number;
  @Input() name: string = '';

  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  widget = computed(() =>
    this.state
      .widgets()
      .find((w) => String(w.widgetId) === String(this.widgetID)),
  );

  constructor(private socket: SocketService) {
    effect(() => {
      const w = this.widget();
      console.log('single widget data ', w.widget.data);
      if (this.widget().widget.chartType === 'doughnut') {
        this.chart.data = {
          labels: ['Online', 'Offline', 'All'],
          datasets: [
            {
              data: [
                this.doughnutwidgetsData()[0],
                this.doughnutwidgetsData()[1],
                this.socket.devices().length,
              ],
              backgroundColor: ['#83CA33', '#CBCBCB'],
              borderColor: ['#83CA33', '#CBCBCB'],
            },
          ],
        };
        this.chart.update('active');
        return;
      }
      this.updateChart(w);
    });
  }
  doughnutwidgetsData = computed(() => {
    const devices = this.socket.devices();
    return [
      devices.filter((d) => d.status === 'online').length,
      devices.filter((d) => d.status === 'offline').length,
    ];
  });
  ngAfterViewInit() {
    if (!this.widget()) return;
    const isLineChart = this.widget().widget.chartType === 'line';
    const isDoughnut =
      this.widget().widget.chartType === 'doughnut' ? true : false;
    const isBar = this.widget().widget.chartType === 'bar' ? true : false;
    this.chart = new Chart(this.canvas.nativeElement, {
      type: isLineChart ? 'line' : this.widget().widget.chartType,
      data: {
        labels: this.widget().widget.dataLabels,
        datasets: this.widget().widget.datasets
          ? this.widget().widget.datasets
          : [
              {
                label: 'Todo',
                backgroundColor: this.widget().color,
                data: this.widget().widget.data,
                borderWidth: 1,
                borderColor: this.widget().color,
                borderRadius: 1,
                pointRadius: isLineChart ? 2 : 0,
                pointHoverRadius: isLineChart ? 2 : 0,
                pointBackgroundColor: isLineChart
                  ? this.widget().color
                  : undefined,
              },
            ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        barPercentage: isBar ? 0.25 : 0,
        borderRadius: isBar ? 15 : 0,
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: isLineChart ? 1 : 0,
          },
        },
        scales: {
          x: {
            display: !isDoughnut,
            min: 0,
            max: 20,
            grid: {
              display: !isDoughnut,
            },
          },
          y: {
            display: !isDoughnut,
            min: -30,
            max: 30,
            beginAtZero: true,
            grid: {
              display: !isDoughnut,
            },
          },
        },
      },
    });
  }
  updateChart(w: BaseWidget | IWidgetChart) {
    if (!w || !this.chart) return;

    this.chart.data.labels = w.widget.dataLabels;

    if (w.widget.datasets) {
      this.chart.data.datasets = w.widget.datasets.map((ds: any) => ({
        label: ds.label,
        data: ds.data,
        borderWidth: 1,
        borderColor: ds.borderColor,
        backgroundColor: ds.borderColor,
        fill: false,
      }));
    } else {
      if (!this.chart.data.datasets.length) return;
      const ds = this.chart.data.datasets[0];
      ds.data = w.widget.data;
      ds.borderWidth = 1;
      ds.borderColor = w.color;
      ds.backgroundColor = w.color;
      if (w.widget.chartType === 'bar') {
        ds.backgroundColor = w.color;
        ds.data = [...w.widget.data];
        this.chart.data.labels = w.widget.dataLabels;
      }
    }
    this.chart.update();
  }
}

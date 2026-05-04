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
  state = inject(SocketService);
  widgets: BaseWidget[] = this.state.widgets();
  chart!: Chart;
  @Input() widgetID!: number;
  @Input() name: string = '';
  // @Input() widget!: Iwidget;
  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  widget = computed(() =>
    this.state
      .widgets()
      .find((w) => String(w.widgetId) === String(this.widgetID)),
  );

  constructor(private socket: SocketService) {
    effect(() => {
      const widgets = this.socket.widgets();
      // if (!this.widget()) return;
      // if (!this.chart) return;
      if (this.widget().widget.chartType === 'doughnut') {
        const online = widgets.filter((d) => d.status === 'online').length;
        const offline = widgets.length - online;
        this.chart.data = {
          labels: ['Online', 'Offline'],
          datasets: [
            {
              data: [online, offline],
              backgroundColor: ['#14C886', '#A7E9D1'],
              borderColor: ['#14C886', '#A7E9D1'],
            },
          ],
        };
        this.chart.update('active');
        return;
      }
      // const w = widgets.find((x) => x.widgetId === this.widget.widgetId);
      if (!this.widget()) return;
      this.chart.data.labels = this.widget().widget.dataLabels;
      this.chart.data.datasets[0].data = this.widget().widget.data;
      this.chart.data.datasets[0].borderColor = this.widget().color;
      this.chart.data.datasets[0].backgroundColor = this.widget().color;
      if (this.widget().widget.chartType == 'bar') {
        this.chart.data.datasets[0].backgroundColor = this.widget().color;
      }
      this.chart.update();
    });
  }
  doughnutwidgetsData = computed(() => {
    const widgets = this.socket.widgets();
    return [
      widgets.filter((d) => d.status === 'online').length,
      widgets.filter((d) => d.status === 'offline').length,
    ];
  });
  ngAfterViewInit() {
    console.log('gg');
    // const widgets = this.socket.widgets();

    console.log('canvas:', this.canvas);
    // console.log('widget:', this.widget());
    if (!this.widget()) return;
    const isLineChart = this.widget().widget.chartType === 'line';
    this.chart = new Chart(this.canvas.nativeElement, {
      type: this.widget().widget.chartType,
      data: {
        labels: this.widget().widget.dataLabels,
        datasets: [
          {
            label: 'Todo',
            backgroundColor: this.widget().color,
            data: this.widget().widget.data,
            borderWidth: 1,
            borderColor: this.widget().color,
            borderRadius: 1,
            pointRadius: isLineChart ? 2 : 0,
            pointHoverRadius: isLineChart ? 2 : 0,
            pointBackgroundColor: isLineChart ? this.widget().color : undefined,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: isLineChart ? 1 : 0,
          },
        },
        scales: {
          x: {
            min: 0,
            max: 20,
          },
          y: {
            min: -30,
            max: 30,
            beginAtZero: true,
          },
        },
      },
    });
  }
  updateChart() {
    // const widgets = this.socket.widgets();
    // const d: any = widgets.find((x) => x.widgetId === this.widget().widgetId);
    if (!this.chart || !this.widget()) return;
    this.chart.data.datasets[0].data = this.widget().widget.data;
    this.chart.data.datasets[0].borderColor = this.widget().color;
    this.chart.data.datasets[0].backgroundColor = this.widget().color;
    // this.chart.data.labels =
    //   this.widget().widget.widgetType === 'chart'
    //     ? this.widget().widget.dataLabels
    //     : [];
    if (this.widget().widget.chartType === 'bar') {
      this.chart.data.datasets[0].backgroundColor = [
        'rgb(25,160,120)',
        'rgb(25,100,115)',
        'rgb(25,110,220)',
        'rgb(25,150,220)',
      ];
    }
    this.chart.update('active');
  }
}

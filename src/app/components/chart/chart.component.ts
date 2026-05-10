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
import { BaseWidget, DataSet } from 'src/app/models/idevices';
import { SocketService } from 'src/app/services/socket.service';
import { barGradient, lineGradient } from 'src/app/utils/chart.utils';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  private socket = inject(SocketService);
  widgets: BaseWidget[] = this.socket.widgets();
  chart!: Chart;
  @Input() widgetInput!: BaseWidget;

  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  widget = computed(() =>
    this.socket
      .widgets()
      .find((w) => String(w.widgetId) === String(this.widgetInput.widgetId)),
  );
  constructor() {
    effect(() => {
      this.widget().widget.datasets.forEach(
        (dataset: DataSet, index: number) => {
          this.chart.data.datasets[index].data = dataset.data;
        },
      );
      this.chart.update('none');
    });
  }

  ngOnInit() {}
  ngAfterViewInit() {
    this.createChart();
    this.updateChart();
  }

  private createChart() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: this.widget().widget.chartType,
      data: {
        labels: this.widget().widget.dataLabels,
        datasets: [
          {
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        devicePixelRatio: window.devicePixelRatio,
        barPercentage: this.widget().widget.chartType === 'bar' ? 0.25 : 0,
        borderRadius: this.widget().widget.chartType === 'bar' ? 15 : 0,
        animation: {
          easing: 'linear',
          duration: 300,
        },
        scales: {
          y: {
            min: -30,
            max: 30,
            grid: {
              // color:
              display: false,
            },
          },
          x: {
            grid: {
              color: 'rgba(0,0,0,0.1)',
            },
          },
        },
      },
    });
  }
  private updateChart() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const w = this.widget().widget;

    if (!ctx) return;

    this.chart.data.datasets = w.datasets.map((d: DataSet) => ({
      ...d,
      label: d.label,
      backgroundColor: d.label === 'Vacuum Load' ? barGradient : d.color,
      borderColor: d.label === 'Vacuum Power Usage' ? lineGradient : d.color,
      tension: d.label === 'Vacuum Power Usage' ? 0.25 : 0,
      pointRadius: 2,
      pointHoverRadius: 5,
      borderWidth: d.label === 'Vacuum Power Usage' ? 2 : 1,
      borderSkipped: false,
    }));
    this.chart.update();
  }
}

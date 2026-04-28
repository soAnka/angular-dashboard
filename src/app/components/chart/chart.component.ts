import {
  Component,
  effect,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IDevice } from '../devices/devices.component';
import { SharedStateService } from 'src/app/services/shared-state.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  state = inject(SharedStateService);
  devices: IDevice[] = this.state.devices();
  chart!: Chart;
  history = [2];
  @Input() name: string = '';
  @Input() device!: IDevice;
  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  constructor() {
    console.log('component created');
    effect(() => {
      if (!this.devices) return;
      this.history = [...this.history, this.device.value];
      this.updateChart();
    });
  }

  ngAfterViewInit() {
    console.log('canvas:', this.canvas);
    console.log('device:', this.device);

    if (!this.device) return;
    this.chart = new Chart(this.canvas.nativeElement, {
      type:
        this.device.widget.widgetType === 'chart'
          ? this.device.widget.chartType
          : 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
            borderColor: '',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {},
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  updateChart() {
    if (!this.chart) return;
    this.chart.data.datasets[0].data = this.history;
    this.chart.data.datasets[0].borderColor = this.device.color;

    this.chart.update();
  }
}

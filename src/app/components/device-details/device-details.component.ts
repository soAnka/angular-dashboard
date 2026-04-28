import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDevice } from '../devices/devices.component';
import { DevicesService } from 'src/app/services/devices.service';
import { SharedStateService } from 'src/app/services/shared-state.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-device-details',
  standalone: true,
  imports: [],
  templateUrl: './device-details.component.html',
  styleUrl: './device-details.component.scss',
})
export class DeviceDetailsComponent {
  state = inject(SharedStateService);
  devices = this.state.devices;
  deviceDetails = signal<IDevice | null>(null);
  chart!: Chart;
  history = [];

  constructor(
    private route: ActivatedRoute,
    api: DevicesService,
  ) {
    effect(() => {
      const d = this.device();

      if (!d || d.value === null) {
        return;
      }
      this.updateChart();
    });
  }
  getDeviceId = Number(this.route.snapshot.paramMap.get('id'));
  device = computed(() =>
    this.devices().find((d) => d.id === this.getDeviceId),
  );

  ngAfterViewInit() {
    this.chart = new Chart('chart', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  updateChart() {
    if (!this.chart) return;
    this.chart.update();
  }
}

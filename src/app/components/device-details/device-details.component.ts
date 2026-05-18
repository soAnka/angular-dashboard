import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevicesService } from 'src/app/services/devices.service';
import { SharedStateService } from 'src/app/services/shared-state.service';
import { Chart, registerables } from 'chart.js';
import { IDevice } from 'src/app/models/idevices';
import { SocketService } from 'src/app/services/socket.service';
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
  devices = this.socket.devices();
  deviceDetails = signal<IDevice | null>(null);
  chart!: Chart;
  history = [];

  // TODO : Details after changes in architecture.

  constructor(
    private route: ActivatedRoute,
    private socket: SocketService,
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
  device = computed(() => this.devices.find((d) => d.id === this.getDeviceId));

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

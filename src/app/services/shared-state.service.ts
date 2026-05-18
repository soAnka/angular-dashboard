import { computed, effect, Injectable, signal } from '@angular/core';
import { SocketService } from './socket.service';

function calculateTrend(data: number[]) {
  if (data.length < 2) return 'stable';
  const last = data[data.length - 1];
  const previous = data[data.length - 2];
  if (last > previous) return 'plus';
  if (last < previous) return 'minus';
  return 'stable';
}
@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  devices = this.socket.devices;
  widgets = this.socket.widgets;
  activeNumDiff = signal(0);
  offlineNumDiff = signal(0);
  kpiWithoutDiff = signal(0);
  previousActive = 0;
  previousOffline = 0;

  onlineDevices = computed(() =>
    this.devices().filter((d) => d.status === 'online'),
  );

  offlineDevices = computed(() =>
    this.devices().filter((d) => d.status === 'offline'),
  );

  avgVal = computed(() => {
    let initialValue = 0;
    const avgVal = this.devices().reduce((acc, num) => {
      return (acc + num.value) / this.devices().length;
    }, initialValue);

    return avgVal;
  });

  tableData = computed(() => {
    console.log('computed');
    const devs = this.devices;
    return this.widgets().map((w) => {
      if (!this.devices) return;
      const device = devs().find((d) => d.id === w.deviceId);
      return {
        ...device,
        type: w.widgetType,
        tableSummary: w.widget.datasets.map((d: any) => ({
          value: d.data[d.data.length - 1],
          color: d.color,
          label: d.label,
          className: d.className,
          trend: calculateTrend(d.data),
          diff: d.data[d.data.length - 1] - d.data[d.data.length - 2],
        })),
      };
    });
  });

  constructor(private socket: SocketService) {
    effect(
      () => {
        const active = this.onlineDevices().length;
        const offline = this.offlineDevices().length;
        this.activeNumDiff.set(active - this.previousActive);
        this.offlineNumDiff.set(offline - this.previousOffline);

        this.previousOffline = offline;
        this.previousActive = active;
      },
      { allowSignalWrites: true },
    );
  }

  kpiDevices = computed(() => {
    const devs = this.devices();

    let initialValue = 0;
    const avgVal = devs.reduce((acc, num) => {
      return (acc + num.value) / devs.length;
    }, initialValue);

    return [
      {
        label: 'All Devices',
        value: this.devices().length,
        icon: 'wb_incandescent',
        diff: this.kpiWithoutDiff(),
      },
      {
        label: 'Active',
        value: this.onlineDevices().length,
        icon: 'cloud',
        diff: this.activeNumDiff(),
      },
      {
        label: 'Off',
        value: this.offlineDevices().length,
        icon: 'notifications_active',
        diff: this.offlineNumDiff(),
      },
      {
        label: 'Avg Value',
        value: avgVal.toFixed(2),
        icon: 'monitoring',
        diff: this.kpiWithoutDiff(),
      },
    ];
  });
}

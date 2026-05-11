import { Component, computed, effect, inject, signal } from '@angular/core';
import { SharedStateService } from 'src/app/services/shared-state.service';
import { RouterLink } from '@angular/router';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ChartComponent } from '../chart/chart.component';
import { SocketService } from 'src/app/services/socket.service';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IDevice } from 'src/app/models/idevices';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    RouterLink,
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatChipsModule,
    ChartComponent,
    JsonPipe,
    MatIconModule,
    ChartComponent,
    TableComponent,
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent {
  state = inject(SharedStateService);
  activeNumDiff = signal(0);
  offlineNumDiff = signal(0);
  kpiWithoutDiff = signal(0);
  previousActive = 0;
  previousOffline = 0;
  devices = this.socket.devices;
  widgets = this.socket.widgets;
  layoutColumns: Record<number, number> = {
    1: 2,
    2: 2,
    3: 2,
  };
  layoutRowspan: Record<number, number> = {
    1: 1,
    2: 2,
    3: 1,
  };

  ngOnInit() {}

  ngOnDestroy() {}

  onlineDev = computed(
    () => this.devices().filter((d: IDevice) => d.status === 'online').length,
  );
  offlineDev = computed(
    () => this.devices().filter((d) => d.status === 'offline').length,
  );

  constructor(private socket: SocketService) {
    this.socket.connect();

    effect(
      () => {
        const active = this.onlineDev();
        const offline = this.offlineDev();
        this.activeNumDiff.set(active - this.previousActive);
        this.offlineNumDiff.set(offline - this.previousOffline);
        this.previousOffline = offline;
      },
      { allowSignalWrites: true },
    );
  }

  kpiDevices = computed(() => {
    const devs = this.devices();

    const all = devs.length;
    const onlineDevices = devs.filter((d) => d.status === 'online').length;
    const offlineDevices = devs.filter((d) => d.status === 'offline').length;
    const avgVal = devs.reduce((a, b) => a + b.value, 0) / (devs.length || 1);

    return [
      {
        label: 'All Devices',
        value: all,
        icon: 'wb_incandescent',
        diff: this.kpiWithoutDiff(),
      },
      {
        label: 'Active',
        value: onlineDevices,
        icon: 'cloud',
        diff: this.activeNumDiff(),
      },
      {
        label: 'Off',
        value: offlineDevices,
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

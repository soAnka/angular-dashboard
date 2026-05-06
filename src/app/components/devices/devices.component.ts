import { Component, computed, inject } from '@angular/core';
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
import { WidgetComponent } from '../widget/widget.component';
import { SocketService } from 'src/app/services/socket.service';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

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
    WidgetComponent,
    JsonPipe,
    MatIconModule,
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent {
  state = inject(SharedStateService);
  devices = this.socketService.devices;
  widgets = this.socketService.widgets;
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

  ngOnDestroy() {
    this.socketService.disconnect();
  }
  constructor(private socketService: SocketService) {
    this.socketService.connect();
  }

  kpiDevices = computed(() => {
    const devs = this.devices();

    const all = devs.length;
    const onlineDevices = devs.filter((d) => d.status === 'online').length;
    const offlineDevices = devs.filter((d) => d.status === 'offline').length;
    const avgVal = devs.reduce((a, b) => a + b.value, 0) / (devs.length || 1);

    return [
      { label: 'All Devices', value: all, icon: '' },
      { label: 'Active', value: onlineDevices, icon: 'cloud' },
      { label: 'Off', value: offlineDevices, icon: 'notifications_active' },
      { label: 'Avg Value', value: avgVal.toFixed(2), icon: 'monitoring' },
    ];
  });
}

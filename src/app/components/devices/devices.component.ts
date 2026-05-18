import { Component, computed, inject, signal } from '@angular/core';
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
import { TableComponent } from '../table/table.component';
import { StatusComponent } from '../status/status.component';
import { TrendComponent } from '../trend/trend.component';

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
    StatusComponent,
    TrendComponent,
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent {
  kpiDevices = this.state.kpiDevices;
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

  ngOnDestroy() {}

  constructor(
    private socket: SocketService,
    private state: SharedStateService,
  ) {
    this.socket.connect();
  }
}

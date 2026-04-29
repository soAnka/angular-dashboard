import { Component, inject } from '@angular/core';
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

export type IWidgetInfo = {
  widgetType: 'info';
  value: number;
  description: string;
};

export type IWidgetTable = {
  widgetType: 'table';
  data: number[];
};
export type IWidgetChart = {
  widgetType: 'chart';
  chartType: 'line' | 'bar';
  data: number[];
};
export interface IDevice {
  id: number;
  name: string;
  status: string;
  value: number;
  color: string;
  widget: IWidgetChart | IWidgetTable;
}
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
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent {
  state = inject(SharedStateService);
  devices = this.socketService.devices;
  // devices = this.state.devices;

  // devicesOnline = this.state.onlineDevices;
  // devicesAvg = this.state.avgVal;
  ngOnInit() {}

  ngOnDestroy() {
    this.socketService.disconnect();
  }
  constructor(private socketService: SocketService) {
    this.socketService.connect();
  }
}

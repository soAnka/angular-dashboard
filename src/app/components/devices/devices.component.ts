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

export interface IWidget {
  widgetType: string;
  chartType: 'line' | 'bar';
}
export interface IDevice {
  id: number;
  name: string;
  status: string;
  value: number;
  color: string;
  widget: IWidget;
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
  devices = this.state.devices;
  devicesOnline = this.state.onlineDevices;
  devicesAvg = this.state.avgVal;

  constructor() {}
}

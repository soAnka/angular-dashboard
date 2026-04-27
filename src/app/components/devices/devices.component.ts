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

export interface IDevice {
  id: number;
  name: string;
  status: string;
  value: number;
  color: string;
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

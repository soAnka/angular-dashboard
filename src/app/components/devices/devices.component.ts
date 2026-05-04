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

// export interface IWidget {
//   widgetId: number;
//   type: 'chart' | 'info';
//   chartType?: 'line'
// }

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
  layputColumns: Record<number, number> = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 2,
    8: 2,
    9: 2,
  };
  layputRowspan: Record<number, number> = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 2,
    9: 1,
  };

  ngOnInit() {}

  ngOnDestroy() {
    this.socketService.disconnect();
  }
  constructor(private socketService: SocketService) {
    this.socketService.connect();
  }
}

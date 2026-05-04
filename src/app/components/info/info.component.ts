import { Component, computed, effect, inject, Input } from '@angular/core';
import { SharedStateService } from 'src/app/services/shared-state.service';

import { SocketService } from 'src/app/services/socket.service';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { WidgetComponent } from '../widget/widget.component';
import { IDevice, IWidgetInfo } from 'src/app/models/idevices';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatChipsModule,
    WidgetComponent,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  state = inject(SharedStateService);
  // devices: IDevice[] = this.state.devices();
  @Input() widget!: IWidgetInfo;
  @Input() name: string = '';
  @Input() device!: IDevice;
  previousOnline = 0;
  currentOnline = 0;
  deltaOnline = 0;
  initialize = false;

  // constructor(private socket: SocketService) {
  //   this.socket.connect();

  //   effect(() => {
  //     const current = this.onlineDevs();
  //     console.log('onlineDevs: ', this.onlineDevs());
  //     if (!this.initialize) {
  //       this.previousOnline = current;
  //       this.initialize = true;
  //       return;
  //     }
  //     const delta = current - this.previousOnline;

  //     if (delta !== 0) {
  //       this.deltaOnline = delta;

  //       setTimeout(() => {
  //         this.deltaOnline = 0;
  //       }, 2000);
  //     }
  //     this.previousOnline = current;
  //   });
  // }
  // onlineDevs = computed(() => {
  //   return this.state.devices().filter((d: IDevice) => d.status === 'online')
  //     .length;
  // });
  // offlineDevs = computed(() => {
  //   return this.state.devices().filter((d: IDevice) => d.status === 'offline')
  //     .length;
  // });
}

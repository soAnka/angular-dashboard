import { Component, computed } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { MatTableModule } from '@angular/material/table';
import { StatusComponent } from '../status/status.component';
import { SharedStateService } from 'src/app/services/shared-state.service';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    StatusComponent,
    MatTooltip,
    MatTooltipModule,
    MatIcon,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  devices = this.socket.devices;
  widgets = this.socket.widgets;
  kpiDevices = this.state.kpiDevices;
  tData = this.state.tableData;

  constructor(
    private socket: SocketService,
    private state: SharedStateService,
  ) {}

  displayedColumns: string[] = ['device', 'status', 'type', 'current', 'trend'];

  tableData = computed(() => {
    const devs = this.devices;
    return this.widgets().map((w) => {
      if (!this.devices) return;
      const device = devs().find((d) => d.id === w.deviceId);
      return {
        ...device,
        type: w.widgetType,
        current: [
          ...w.widget.datasets.map((d: any) => ({
            value: d.data[d.data.length - 1],
            color: d.color,
            label: d.label,
            className: d.className,
          })),
        ],
        trend: 'plus',
      };
    });
  });

  ngAfterViewInit() {
    console.log(this.tData());
  }

  dataSource = this.tData();
}

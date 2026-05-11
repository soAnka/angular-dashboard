import { Component, computed, effect, inject } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { MatTableModule } from '@angular/material/table';
import { BaseWidget } from 'src/app/models/idevices';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  devices = this.socket.devices;
  widgets = this.socket.widgets;

  constructor(private socket: SocketService) {}

  displayedColumns: string[] = ['device', 'status', 'type', 'current', 'trend'];

  tableData = computed(() => {
    console.log('computed');
    const devs = this.devices;
  });

  dataSource = this.tableData();
}

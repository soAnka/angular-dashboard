import { Component, Input } from '@angular/core';
import { IDevice } from '../devices/devices.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() name: string = '';
  @Input() device!: IDevice;
}

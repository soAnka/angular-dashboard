import { Component, signal } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { toSignal } from '@angular/core/rxjs-interop';

export interface IDevice {
  id: number;
  name: string;
}
@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent {
  devices = toSignal(this.api.getData(), { initialValue: [] });

  constructor(private api: DevicesService) {
    // }
  }
}

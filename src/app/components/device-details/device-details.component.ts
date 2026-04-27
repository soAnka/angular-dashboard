import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDevice } from '../devices/devices.component';
import { DevicesService } from 'src/app/services/devices.service';
import { SharedStateService } from 'src/app/services/shared-state.service';

@Component({
  selector: 'app-device-details',
  standalone: true,
  imports: [],
  templateUrl: './device-details.component.html',
  styleUrl: './device-details.component.scss',
})
export class DeviceDetailsComponent {
  state = inject(SharedStateService);
  devices = this.state.devices;
  deviceDetails = signal<IDevice | null>(null);
  constructor(
    private route: ActivatedRoute,
    api: DevicesService,
  ) {
    const getDeviceId = Number(this.route.snapshot.paramMap.get('id'));
    const deviceId = computed(() => {
      if (!this.devices()) return;
      this.devices().find((d) => d.id === getDeviceId);
    });
  }
}

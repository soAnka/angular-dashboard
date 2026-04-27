import { computed, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DevicesService } from './devices.service';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  devices = toSignal(this.api.getData(), { initialValue: [] });

  constructor(private api: DevicesService) {}

  onlineDevices = computed(
    () => this.devices().filter((d) => d.status === 'online').length,
  );

  avgVal = computed(() => {
    const devices = this.devices()

      .map((d) => d.value)
      .filter((v) => v !== null) as number[];
    if (!devices.length) return 0;

    return +(devices.reduce((a, b) => a + b, 0) / devices.length).toFixed(2);
  });
}

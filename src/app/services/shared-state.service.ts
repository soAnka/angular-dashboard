import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DevicesService } from './devices.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  // devices = toSignal(this.api.getData(), { initialValue: [] });
  // widgets = toSignal(this.api.getData(), { initialValue: [] });

  constructor(private socket: SocketService) {}
}

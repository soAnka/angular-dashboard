import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { IDevice } from '../models/idevices';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  devices = signal<IDevice[]>([]);
  widgets = signal<any[]>([]);

  connect(): void {
    this.socket = io('http://localhost:3001');

    this.socket.on('init', (data) => {
      this.devices.set(data.devices);
      this.widgets.set(data.widgets);
    });

    this.socket.on('update', (data) => {
      console.log('socket update received');
      this.devices.set(data.devices);
      this.widgets.set(data.widgets);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

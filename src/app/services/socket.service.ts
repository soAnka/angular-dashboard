import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  devices = signal<any[]>([]);

  connect(): void {
    this.socket = io('http://localhost:3001');

    this.socket.on('init', (data) => {
      this.devices.set(data);
    });

    this.socket.on('update', (data) => {
      console.log('socket update received');
      this.devices.set(data);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

import { Routes } from '@angular/router';
import { DevicesComponent } from './components/devices/devices.component';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
  },
  {
    path: 'devices',
    component: DevicesComponent,
  },
  {
    path: 'devices/:id',
    component: DeviceDetailsComponent,
  },
];

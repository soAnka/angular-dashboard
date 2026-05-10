import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatIcon,
    RouterOutlet,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  sideMenu = [
    { name: 'Smart Home', icon: 'nest_secure_alarm' },
    { name: 'Dashboard', icon: 'dashboard_2' },
    { name: 'Devices', icon: 'monitoring' },
    { name: 'Analytics', icon: 'analytics' },
    { name: 'Alerts', icon: 'monitoring' },
    { name: 'Settings', icon: 'settings' },
  ];
}

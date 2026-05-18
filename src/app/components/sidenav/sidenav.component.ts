import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatIcon,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  sideMenu = [
    { name: 'Smart Home', icon: 'nest_secure_alarm', path: 'info' },
    { name: 'Dashboard', icon: 'dashboard_2', path: 'devices' },
    { name: 'Devices', icon: 'monitoring', path: 'info' },
    { name: 'Analytics', icon: 'analytics', path: 'info' },
    { name: 'Alerts', icon: 'monitoring', path: 'info' },
    { name: 'Settings', icon: 'settings', path: 'info' },
  ];
}

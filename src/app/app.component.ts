import { Component } from '@angular/core';
import { DevicesComponent } from './components/devices/devices.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DevicesComponent,
    RouterOutlet,
    RouterLink,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    SidenavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dashboard';
}

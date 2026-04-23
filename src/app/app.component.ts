import { Component } from '@angular/core';
import { DevicesComponent } from './components/devices/devices.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DevicesComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dashboard';
}

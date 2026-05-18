import { Component, Input } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { DeviceStatus } from 'src/app/models/idevices';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [MatChip],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  @Input({ required: true }) status!: DeviceStatus;
}

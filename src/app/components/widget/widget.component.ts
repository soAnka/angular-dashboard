import { Component, Input } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { IDevice } from '../devices/devices.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [ChartComponent, CommonModule],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
})
export class WidgetComponent {
  @Input() device!: any;
  widgetMap: Record<string, any> = {
    chart: ChartComponent,
    table: 'table',
  };

  ngOnInit() {
    console.log('widgetMap:', this.widgetMap);
    console.log('device type:', this.device?.widget?.widgetType);
  }
}

import { Component, Input, Type } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { IDevice } from '../devices/devices.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';

type WidgetType = IDevice['widget']['widgetType'];

type WidgetComponentMap = {
  [K in WidgetType]: Type<any>;
};

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [ChartComponent, CommonModule, TableComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
})
export class WidgetComponent {
  @Input() device!: any;
  widgetMap: Record<string, any> = {
    chart: ChartComponent,
    table: TableComponent,
  };

  ngOnInit() {
    console.log('widgetMap:', this.widgetMap);
    console.log('device type:', this.device?.widget?.widgetType);
  }
}

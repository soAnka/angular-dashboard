import { Component, Input, Type } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { InfoComponent } from '../info/info.component';
import { IDevice } from 'src/app/models/idevices';

// type WidgetType = IDevice['widget']['widgetType'];

// type WidgetComponentMap = {
//   [K in WidgetType]: Type<any>;
// };

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [ChartComponent, CommonModule, TableComponent, InfoComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
})
export class WidgetComponent {
  @Input() widget!: any;
  // widgetMap: Record<string, any> = {
  //   chart: ChartComponent,
  //   table: TableComponent,
  //   info: InfoComponent,
  // };
  // ngOnInit() {
  //   console.log('widgetMap:', this.widgetMap);
  //   console.log('device type:', this.device?.widget?.widgetType);
  // }
}

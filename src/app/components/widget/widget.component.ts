import { Component, Input } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [ChartComponent, CommonModule, TableComponent, InfoComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
})
export class WidgetComponent {
  @Input() widget!: any;
}

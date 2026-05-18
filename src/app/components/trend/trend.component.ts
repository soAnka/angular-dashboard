import { Component, computed, inject, Input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
// import { KpiService } from 'src/app/services/kpi.service';
import { SharedStateService } from 'src/app/services/shared-state.service';

@Component({
  selector: 'app-trend',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './trend.component.html',
  styleUrl: './trend.component.scss',
})
export class TrendComponent {
  @Input({ required: true }) kpi!: any;

  getAbs(num: number): number {
    return Math.abs(num);
  }
  constructor(private state: SharedStateService) {}
}

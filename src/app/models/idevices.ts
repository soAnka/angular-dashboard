// DEVICE
export interface IDevice {
  id: number;
  name: string;
  status: DeviceStatus;
  value: number;
}
export type DeviceStatus = 'online' | 'offline';

// WIDGET

export type BaseWidget = {
  widgetType: 'chart';
  widgetId: number;
  deviceId: number;
  color: string;
  widget: IWidgetChart;
};

export type DataSet = {
  label: string;
  data: number[];
  color: string;
};

export type IWidgetChart = {
  chartType: 'line' | 'bar' | 'doughnut';
  dataLabels: string[];
  datasets: DataSet[];
};

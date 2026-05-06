export type BaseWidget = {
  widgetType: 'chart' | 'info';
  widgetId: number;
  deviceId: number;
  color: string;
  widget: IWidgetChart;
};
export interface IDevice {
  id: number;
  name: string;
  status: DeviceStatus;
  value: number;
}

export type IWidgetChart = BaseWidget & {
  chartType: 'line' | 'bar' | 'doughnut';
  data: number[];
  dataLabels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      borderColor: string;
    },
  ];
};

export type DeviceStatus = {
  status: 'online' | 'offline';
};

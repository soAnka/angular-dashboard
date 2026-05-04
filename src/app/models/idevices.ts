export type BaseWidget = {
  widgetId: number;
  deviceId: number;
  color: string;
  widget: IWidgetChart | IWidgetInfo;
};
export interface IDevice {
  id: number;
  name: string;
  status: DeviceStatus;
  value: number;
  //   widget: IWidgetChart | IWidgetInfo;
}

export type IWidgetInfo = BaseWidget & {
  widgetType: 'info';
  kpiType: string;
};

export type IWidgetChart = BaseWidget & {
  widgetType: 'chart';
  chartType: 'line' | 'bar' | 'doughnut';
  data: number[];
  dataLabels: string[];
};

export type DeviceStatus = {
  status: 'online' | 'offline';
};

// W IDevice usuwam widget
// Przesuwam widget do BaseWidget type; dodaje deviceId.
// w interface chart, usuwam data i dataLabels daje jedne data

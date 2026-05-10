import { ScriptableContext } from 'chart.js';

export function createGradient(
  colors: string[],
  direction: 'horizontal' | 'vertical',
  context: ScriptableContext<'bar' | 'line'>,
) {
  const { ctx, chartArea } = context.chart;
  if (!chartArea) return 'green';
  let gradient: any;
  if (direction === 'vertical') {
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  } else if (direction === 'horizontal') {
    gradient = ctx.createLinearGradient(0, 0, 400, 0);
  }

  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });

  return gradient;
}

export const lineGradient = (context: ScriptableContext<'line' | 'bar'>) => {
  return createGradient(['#0055f4', '#00fcfc'], 'horizontal', context);
};
export const barGradient = (context: ScriptableContext<'line' | 'bar'>) => {
  return createGradient(
    ['#5400A5', '#5400A5', '#B925FF', '#B925FF'],
    'vertical',
    context,
  );
};

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '../components/utils';

interface ChartBarProps {
  data: Array<Record<string, unknown>>;
  xAxisKey?: string;
  bars: Array<{ key: string; color: string; name?: string }>;
  className?: string;
  height?: number;
  layout?: 'vertical' | 'horizontal';
}

const CustomTooltip: React.FC<{ active?: boolean; payload?: Array<{ dataKey?: string; color?: string; name?: string; value?: unknown }>; label?: string }> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-surface border border-border rounded-md px-3 py-2 shadow-lg">
      <p className="text-xs text-text-tertiary mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm flex justify-between gap-3">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: entry.color }} />
            <span className="text-text-secondary">{entry.name || entry.dataKey}</span>
          </span>
          <span className="text-text-primary font-medium">{String(entry.value)}</span>
        </p>
      ))}
    </div>
  );
};

export function ChartBar({
  data,
  xAxisKey = 'name',
  bars,
  className,
  height = 200,
  layout = 'vertical',
}: ChartBarProps): JSX.Element {
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data} layout={layout} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="2 2" stroke="var(--color-border)" opacity={0.5} />
          <XAxis 
            dataKey={xAxisKey} 
            tick={{ fill: 'var(--color-text-tertiary)', fontSize: 11 }} 
            axisLine={false} 
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: 'var(--color-text-tertiary)', fontSize: 11 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip content={<CustomTooltip />} />
          {bars.map((bar) => (
            <Bar 
              key={bar.key} 
              dataKey={bar.key} 
              fill={bar.color} 
              name={bar.name} 
              radius={layout === 'horizontal' ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              isAnimationActive={false} 
            />
          ))}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}

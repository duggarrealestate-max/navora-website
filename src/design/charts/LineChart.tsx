import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { cn } from '../components/utils';

interface ChartLineProps {
  data: Array<Record<string, unknown>>;
  xAxisKey?: string;
  lines: Array<{ key: string; color: string; name?: string; dot?: boolean }>;
  yAxisPrefix?: string;
  yAxisSuffix?: string;
  className?: string;
  height?: number;
  showArea?: boolean;
}

const CustomTooltip: React.FC<{ active?: boolean; payload?: Array<{ dataKey?: string; color?: string; name?: string; value?: unknown }>; label?: string }> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-surface border border-border rounded-md px-3 py-2 shadow-lg">
      <p className="text-xs text-text-tertiary mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm flex justify-between gap-3">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-text-secondary">{entry.name || entry.dataKey}</span>
          </span>
          <span className="text-text-primary font-medium">{String(entry.value)}</span>
        </p>
      ))}
    </div>
  );
};

export function ChartLine({
  data,
  xAxisKey = 'name',
  lines,
  yAxisPrefix,
  yAxisSuffix,
  className,
  height = 200,
  showArea = false,
}: ChartLineProps): JSX.Element {
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {showArea ? (
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              {lines.map((line) => (
                <linearGradient key={line.key} id={`gradient-${line.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={line.color} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={line.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="2 2" stroke="var(--color-border)" opacity={0.5} />
            <XAxis
              dataKey={xAxisKey}
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => `${yAxisPrefix || ''}${val}${yAxisSuffix || ''}`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            {lines.map((line) => (
              <>
                <Area
                  key={`area-${line.key}`}
                  type="monotone"
                  dataKey={line.key}
                  stroke={line.color}
                  fill={`url(#gradient-${line.key})`}
                  strokeWidth={2}
                  isAnimationActive={false}
                />
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  stroke={line.color}
                  name={line.name}
                  dot={line.dot !== false}
                  strokeWidth={2}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              </>
            ))}
          </AreaChart>
        ) : (
          <ReLineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="var(--color-border)" opacity={0.5} />
            <XAxis
              dataKey={xAxisKey}
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              tick={{ fill: 'var(--color-text-tertiary)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => `${yAxisPrefix || ''}${val}${yAxisSuffix || ''}`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            {lines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                name={line.name}
                dot={line.dot !== false}
                strokeWidth={2}
                activeDot={{ r: 4, strokeWidth: 0 }}
                isAnimationActive={false}
              />
            ))}
          </ReLineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

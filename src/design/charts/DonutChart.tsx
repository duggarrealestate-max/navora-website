import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { cn } from '../components/utils';

interface DonutChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  className?: string;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  label?: boolean;
  centerText?: string;
  centerSubtext?: string;
}

export function ChartDonut({
  data,
  className,
  height = 200,
  innerRadius = 60,
  outerRadius = 100,
  label = false,
  centerText,
  centerSubtext,
}: DonutChartProps): JSX.Element {
  const _total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            stroke="none"
            label={label ? {
              fill: 'var(--color-text-tertiary)',
              fontSize: 11,
            } : false}
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-surface)', 
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              fontSize: '12px',
            }}
            itemStyle={{ color: 'var(--color-text-primary)' }}
            labelStyle={{ color: 'var(--color-text-tertiary)', marginBottom: '4px' }}
          />
          {(centerText || centerSubtext) && (
            <text x="50%" y="50%" textAnchor="middle" dy="0">
              {centerText && (
                <tspan 
                  x="50%" 
                  dy="-0.2em" 
                  textAnchor="middle" 
                  fill="var(--color-text-primary)" 
                  fontSize="16" 
                  fontWeight="600"
                >
                  {centerText}
                </tspan>
              )}
              {centerSubtext && (
                <tspan 
                  x="50%" 
                  dy="1.2em" 
                  textAnchor="middle" 
                  fill="var(--color-text-tertiary)" 
                  fontSize="11"
                >
                  {centerSubtext}
                </tspan>
              )}
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

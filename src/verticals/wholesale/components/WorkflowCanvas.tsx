import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';
import type { Workflow } from '@demo/entities/workflows';
import { cn } from '@design/components/utils';

interface WorkflowCanvasProps {
  workflow: Workflow;
}

const stepIcons: Record<string, string> = {
  trigger: '▶',
  check: '✓',
  action: '⚡',
  wait: '⏳',
  send: '📤',
};

const stepColors: Record<string, string> = {
  trigger: 'text-info',
  check: 'text-warning',
  action: 'text-success',
  wait: 'text-secondary',
  send: 'text-primary',
};

export function WorkflowCanvas({ workflow }: WorkflowCanvasProps): JSX.Element {
  const sortedSteps = [...workflow.steps].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-text-secondary">Workflow: {workflow.name}</h3>
          <p className="text-xs text-text-tertiary mt-1">{workflow.description}</p>
        </div>
        <Badge variant={workflow.status === 'active' ? 'success' : workflow.status === 'error' ? 'error' : workflow.status === 'paused' ? 'warning' : 'default'}>
          {workflow.status}
        </Badge>
      </div>

      <div className="space-y-4">
        {sortedSteps.map((step, i) => (
          <div key={step.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold', 'bg-surface-hover border border-border')}>
                <span className={stepColors[step.type]}>{stepIcons[step.type]}</span>
              </div>
              {i < sortedSteps.length - 1 && <div className="w-px h-full bg-border mt-1" />}
            </div>
            <Card className="flex-1 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-text-primary">{step.label}</h4>
                  <p className="text-xs text-text-tertiary mt-1 capitalize">{step.type} step</p>
                </div>
                <Badge variant="outline" size="sm">
                  #{step.order + 1}
                </Badge>
              </div>
              {step.config && Object.keys(step.config).length > 0 && (
                <div className="mt-2 text-xs text-text-tertiary">
                  {Object.entries(step.config).map(([k, v]) => (
                    <span key={k}>
                      {k}: {String(v)}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-text-tertiary">
          Runs: {workflow.runs} | Success: {workflow.successCount} | Errors: {workflow.errorCount}
          {workflow.lastRun && ` | Last run: ${new Date(workflow.lastRun).toLocaleString('en-GB')}`}
        </p>
      </div>
    </div>
  );
}

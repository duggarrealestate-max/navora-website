import { Header } from '@design/layout/Header';
import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';
import { Button } from '@design/components/Button';
import { useDemoData } from '@app/providers/DemoContext';
import { WorkflowCanvas } from '../components/WorkflowCanvas';
import type { Workflow } from '@demo/entities/workflows';
import { useState } from 'react';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@design/components/Table';

export function AutomationPage(): JSX.Element {
  const data = useDemoData();
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);

  const handleSelectWorkflow = (wf: Workflow) => {
    setActiveWorkflow(wf);
  };

  const handleBack = () => {
    setActiveWorkflow(null);
  };

  return (
    <div className="space-y-4">
      <Header 
        title="Automation" 
        subtitle="Workflow management & orchestration"
      />

      {activeWorkflow ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              ← Back
            </Button>
            <h2 className="text-lg font-semibold text-text-primary">{activeWorkflow.name}</h2>
            <Badge variant={activeWorkflow.status === 'active' ? 'success' : activeWorkflow.status === 'paused' ? 'warning' : 'default'}>
              {activeWorkflow.status}
            </Badge>
          </div>
          <WorkflowCanvas workflow={activeWorkflow} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-xs text-text-tertiary">
              {data.workflows.filter((w) => w.status === 'active').length} active workflows managing{' '}
              {data.workflows.reduce((sum, w) => sum + w.runs, 0)} total runs
            </p>
            <Button size="sm">Create Workflow</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.workflows.map((wf) => (
              <Card key={wf.id} className="p-4 hover:border-border-hover transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">{wf.name}</h3>
                    <p className="text-xs text-text-tertiary mt-1">{wf.description}</p>
                  </div>
                  <Badge variant={wf.status === 'active' ? 'success' : wf.status === 'error' ? 'error' : wf.status === 'paused' ? 'warning' : 'default'} size="sm">
                    {wf.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-text-tertiary mb-3">
                  <span>{wf.runs} runs</span>
                  <span>{wf.successCount} success / {wf.errorCount} errors</span>
                </div>
                <Button size="sm" variant="ghost" className="w-full" onClick={() => handleSelectWorkflow(wf)}>
                  Inspect Workflow
                </Button>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function WorkflowDetailPage(): JSX.Element {
  const data = useDemoData();
  const workflow = data.workflows[0];
  const runs = data.workflowRuns.get(workflow.id) || [];

  const successRuns = runs.filter((r) => r.status === 'success').length;
  const failedRuns = runs.filter((r) => r.status === 'failed').length;
  const successRate = runs.length > 0 ? Math.round((successRuns / runs.length) * 100) : 0;

  return (
    <div className="space-y-4">
      <Header title={workflow.name} subtitle={workflow.description} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Total Runs</p>
          <p className="text-2xl font-bold text-primary mt-1">{workflow.runs}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Successful</p>
          <p className="text-2xl font-bold text-success mt-1">{successRuns}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Failed</p>
          <p className="text-2xl font-bold text-error mt-1">{failedRuns}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">Success Rate</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{successRate}%</p>
        </Card>
      </div>

      <Card className="p-5">
        <WorkflowCanvas workflow={workflow} />
      </Card>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Recent Runs</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Run ID</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Triggered</TableHeader>
              <TableHeader>Completed</TableHeader>
              <TableHeader>Result</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {runs.slice(0, 10).map((run) => (
              <TableRow key={run.id} hover>
                <TableCell className="text-xs font-mono text-text-tertiary">{run.id}</TableCell>
                <TableCell>
                  <Badge variant={run.status === 'success' ? 'success' : run.status === 'failed' ? 'error' : run.status === 'running' ? 'info' : 'warning'} size="sm">
                    {run.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-text-tertiary">{new Date(run.triggeredAt).toLocaleString('en-GB')}</TableCell>
                <TableCell className="text-xs text-text-tertiary">
                  {run.completedAt ? new Date(run.completedAt).toLocaleString('en-GB') : '—'}
                </TableCell>
                <TableCell className="text-xs text-text-tertiary">{run.result || '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

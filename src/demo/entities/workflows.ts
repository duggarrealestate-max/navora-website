import { randomInt, randomChoice, randomBoolean } from '@demo/data/seed';

export type WorkflowStatus = 'active' | 'paused' | 'draft' | 'error';

export interface WorkflowStep {
  id: string;
  type: 'trigger' | 'check' | 'action' | 'wait' | 'send';
  label: string;
  config: Record<string, unknown>;
  order: number;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  triggeredAt: string;
  completedAt: string | null;
  status: 'success' | 'running' | 'failed' | 'stopped';
  result?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  steps: WorkflowStep[];
  runs: number;
  successCount: number;
  errorCount: number;
  lastRun: string | null;
  createdAt: string;
  updatedAt: string;
}

const workflowDefs: Array<{
  name: string;
  description: string;
  steps: Array<{ type: WorkflowStep['type']; label: string; config: Record<string, unknown> }>;
}> = [
  {
    name: 'Dormant Customer Recovery',
    description: 'Detects customers who haven\'t ordered in 21 days and triggers follow-up actions.',
    steps: [
      { type: 'trigger', label: 'Customer has not ordered for 21 days', config: { days: 21 } },
      { type: 'check', label: 'Customer value > £2,000', config: { threshold: 2000 } },
      { type: 'action', label: 'Create sales task', config: { assignTo: 'account-manager' } },
      { type: 'send', label: 'Prepare approved WhatsApp follow-up', config: { template: 'recovery' } },
      { type: 'wait', label: 'Wait 3 days', config: { days: 3 } },
      { type: 'check', label: 'Order placed?', config: {} },
      { type: 'action', label: 'Close workflow', config: {} },
    ],
  },
  {
    name: 'Low Stock Alert',
    description: 'Notifies the buying team when products fall below safety stock levels.',
    steps: [
      { type: 'trigger', label: 'Stock level drops below reorder point', config: {} },
      { type: 'check', label: 'Product is a fast-moving category', config: {} },
      { type: 'action', label: 'Create purchase task', config: { assignTo: 'purchasing' } },
      { type: 'send', label: 'Email buying team', config: {} },
    ],
  },
  {
    name: 'Order Confirmation',
    description: 'Sends immediate order confirmation to customers after checkout.',
    steps: [
      { type: 'trigger', label: 'Order status changes to confirmed', config: {} },
      { type: 'send', label: 'Send email/SMS confirmation', config: { channel: 'email' } },
      { type: 'action', label: 'Update customer timeline', config: {} },
    ],
  },
  {
    name: 'Delivery Update',
    description: 'Sends tracking updates to customers at key delivery milestones.',
    steps: [
      { type: 'trigger', label: 'Courier status changes', config: {} },
      { type: 'check', label: 'Status is delivered', config: {} },
      { type: 'send', label: 'Send delivery confirmation', config: {} },
      { type: 'action', label: 'Close order', config: {} },
    ],
  },
  {
    name: 'Payment Reminder',
    description: 'Reminds customers of overdue invoices automatically.',
    steps: [
      { type: 'trigger', label: 'Invoice becomes overdue', config: {} },
      { type: 'check', label: 'Days overdue > 3', config: { days: 3 } },
      { type: 'send', label: 'Send payment reminder email', config: {} },
      { type: 'wait', label: 'Wait 5 days', config: { days: 5 } },
      { type: 'action', label: 'Escalate to account manager', config: {} },
    ],
  },
  {
    name: 'VIP Customer Follow-up',
    description: 'Schedules proactive check-ins for VIP customers quarterly.',
    steps: [
      { type: 'trigger', label: '90 days since last VIP contact', config: { days: 90 } },
      { type: 'action', label: 'Create sales task', config: { assignTo: 'sales-manager' } },
      { type: 'send', label: 'Send VIP offer email', config: {} },
    ],
  },
  {
    name: 'New Trade Account Welcome',
    description: 'Welcomes new trade accounts and provides starter resources.',
    steps: [
      { type: 'trigger', label: 'New customer tagged as VIP', config: {} },
      { type: 'send', label: 'Send welcome email with pricing guide', config: {} },
      { type: 'action', label: 'Assign account owner', config: {} },
      { type: 'wait', label: 'Wait 3 days', config: { days: 3 } },
      { type: 'action', label: 'Schedule intro call', config: {} },
    ],
  },
];

const stepIcons = {
  trigger: '→',
  check: '?',
  action: '⚡',
  wait: '⏳',
  send: '📧',
} as const;

export function generateWorkflowIcons(): Record<string, string> {
  return stepIcons;
}

export function generateWorkflows(): Workflow[] {
  return workflowDefs.map((def, i) => {
    const runs = randomInt(10, 500);
    const successRate = randomBoolean(0.7) ? randomInt(85, 99) : 100;
    const successCount = Math.floor((runs * successRate) / 100);
    const errorCount = runs - successCount;
    const statuses: WorkflowStatus[] = ['active', 'active', 'active', 'paused', 'draft', 'error'];

    return {
      id: `wf-${String(i + 1).padStart(3, '0')}`,
      name: def.name,
      description: def.description,
      status: randomChoice(statuses),
      steps: def.steps.map((step, j) => ({
        id: `step-${i}-${j}`,
        type: step.type,
        label: step.label,
        config: step.config,
        order: j,
      })),
      runs,
      successCount,
      errorCount,
      lastRun: randomBoolean(0.8)
        ? new Date(Date.now() - randomInt(0, 72) * 3600 * 1000).toISOString()
        : null,
      createdAt: new Date(Date.now() - randomInt(30, 365) * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - randomInt(0, 7) * 24 * 3600 * 1000).toISOString(),
    };
  });
}

export function generateWorkflowRuns(workflowId: string, count: number = 20): WorkflowRun[] {
  const runs: WorkflowRun[] = [];
  for (let i = 0; i < count; i++) {
    const status: WorkflowRun['status'] = randomChoice(['success', 'success', 'success', 'running', 'failed', 'stopped']);
    const started = new Date(Date.now() - randomInt(0, 168) * 3600 * 1000);
    const completed = status === 'running' ? null : new Date(started.getTime() + randomInt(1, 60) * 60 * 1000);

    runs.push({
      id: `run-${workflowId}-${String(i + 1).padStart(4, '0')}`,
      workflowId,
      triggeredAt: started.toISOString(),
      completedAt: completed ? completed.toISOString() : null,
      status,
      result: status === 'success' ? 'Workflow completed successfully' : status === 'failed' ? 'Check condition failed' : undefined,
    });
  }
  return runs;
}

import { useEffect, useState } from 'react';
import { createRng, randomInt } from './seed';
import { generateCustomers } from '../entities/customers';
import { generateProducts } from '../entities/products';
import { generateOrders } from '../entities/orders';
import { generateActivities } from '../entities/activities';
import { generateWorkflows, generateWorkflowRuns } from '../entities/workflows';
import type { Customer } from '../entities/customers';
import type { Product } from '../entities/products';
import type { Order } from '../entities/orders';
import type { ActivityLog } from '../entities/activities';
import type { Workflow, WorkflowRun } from '../entities/workflows';

export interface DemoDataset {
  customers: Customer[];
  products: Product[];
  orders: Order[];
  activities: ActivityLog[];
  workflows: Workflow[];
  workflowRuns: Map<string, WorkflowRun[]>;
  generatedAt: string;
  seed: string;
}

const CACHE_KEY = 'wholesale-os-demo-data';

export function generateDataset(seed: string = 'wholesale-os-2026-demo'): DemoDataset {
  createRng(seed);

  const customers = generateCustomers(50);
  const products = generateProducts(100);
  const orders = generateOrders(120);
  const activities = generateActivities(40);
  const workflows = generateWorkflows();

  const workflowRuns = new Map<string, WorkflowRun[]>();
  for (const wf of workflows) {
    workflowRuns.set(wf.id, generateWorkflowRuns(wf.id, randomInt(10, 30)));
  }

  return {
    customers,
    products,
    orders,
    activities,
    workflows,
    workflowRuns,
    generatedAt: new Date().toISOString(),
    seed,
  };
}

export function getDemoDataset(): DemoDataset {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as Omit<DemoDataset, 'workflowRuns'> & {
        workflowRuns: Array<[string, WorkflowRun[]]>;
      };
      const dataset: DemoDataset = {
        ...parsed,
        workflowRuns: new Map(parsed.workflowRuns),
      };
      return dataset;
    }
  } catch (e) {
    console.warn('Failed to parse cached demo data, regenerating', e);
  }

  const dataset = generateDataset();
  persistDataset(dataset);
  return dataset;
}

function persistDataset(dataset: DemoDataset): void {
  try {
    const serializable = {
      ...dataset,
      workflowRuns: Array.from(dataset.workflowRuns.entries()) as Array<[string, WorkflowRun[]]>,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(serializable));
  } catch (e) {
    console.warn('Failed to persist demo data', e);
  }
}

export function useDemoData(): DemoDataset {
  const [data, setData] = useState<DemoDataset | null>(null);

  useEffect(() => {
    setData(getDemoDataset());
  }, []);

  if (!data) {
    return generateDataset();
  }

  return data;
}

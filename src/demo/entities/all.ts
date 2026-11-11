import { generateCustomers } from '@demo/entities/customers';
import { generateProducts } from '@demo/entities/products';
import { generateOrders } from '@demo/entities/orders';
import { generateActivities } from '@demo/entities/activities';
import { generateWorkflows, generateWorkflowRuns } from '@demo/entities/workflows';
import { type Customer } from '@demo/entities/customers';
import { type Product } from '@demo/entities/products';
import { type Order } from '@demo/entities/orders';
import { type ActivityLog } from '@demo/entities/activities';
import { type Workflow, type WorkflowRun } from '@demo/entities/workflows';
import { createRng } from '../data/seed';

createRng();

export const customers: Customer[] = generateCustomers(50);
export const products: Product[] = generateProducts(100);
export const orders: Order[] = generateOrders(120);
export const activities: ActivityLog[] = generateActivities(40);
export const workflows: Workflow[] = generateWorkflows();

const workflowRuns = new Map<string, WorkflowRun[]>();
for (const wf of workflows) {
  workflowRuns.set(wf.id, generateWorkflowRuns(wf.id, 20));
}

export { workflowRuns };

export type { Customer, CustomerSegment } from './customers';
export type { Product, ProductCategory, ProductBrand, StockStatus } from './products';
export type { Order, OrderStatus } from './orders';
export type { ActivityLog, ActivityType } from './activities';
export type { Workflow, WorkflowRun, WorkflowStatus } from './workflows';

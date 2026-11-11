import type {
  DeliveryProvider,
  DeliveryTracking,
} from '@integrations/delivery/DeliveryProvider';

export class DemoDeliveryProvider implements DeliveryProvider {
  getName(): string {
    return 'Demo Delivery Provider';
  }

  async createTracking(params: {
    orderId: string;
    service: 'standard' | 'express';
    address: Record<string, unknown>;
  }): Promise<DeliveryTracking> {
    return {
      id: `tracking_${Date.now()}`,
      orderId: params.orderId,
      status: 'preparing',
      carrier: 'Royal Mail (Demo)',
      trackingNumber: `RM${Date.now().toString().slice(4)}`,
      estimatedDelivery: new Date(Date.now() + (params.service === 'express' ? 1 : 3) * 24 * 60 * 60 * 1000).toISOString(),
      events: [],
    };
  }

  async getTracking(id: string): Promise<DeliveryTracking> {
    return {
      id,
      orderId: 'order-001',
      status: 'delivered',
      carrier: 'Royal Mail (Demo)',
      trackingNumber: 'RM123456789',
      estimatedDelivery: new Date().toISOString(),
      actualDelivery: new Date().toISOString(),
      events: [
        { status: 'preparing', timestamp: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(), location: 'Warehouse' },
        { status: 'picked', timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), location: 'Warehouse' },
        { status: 'in-transit', timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), location: 'Regional Hub' },
        { status: 'delivered', timestamp: new Date(Date.now() - 23 * 3600 * 1000).toISOString(), location: 'Customer Premises' },
      ],
    };
  }
}

export interface DeliveryTracking {
  id: string;
  orderId: string;
  status: 'preparing' | 'picked' | 'in-transit' | 'delivered' | 'exception';
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  events: Array<{ status: string; timestamp: string; location?: string }>;
}

export interface DeliveryProvider {
  createTracking(params: {
    orderId: string;
    service: 'standard' | 'express';
    address: Record<string, unknown>;
  }): Promise<DeliveryTracking>;

  getTracking(id: string): Promise<DeliveryTracking>;

  getName(): string;
}

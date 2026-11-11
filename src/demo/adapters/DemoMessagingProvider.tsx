import type {
  MessagingProvider,
  MessageParams,
  MessageReceipt,
} from '@integrations/messaging/MessagingProvider';

export class DemoMessagingProvider implements MessagingProvider {
  private counter = 0;

  getName(): string {
    return 'Demo Messaging Provider';
  }

  async send(params: MessageParams): Promise<MessageReceipt> {
    console.info('[DemoMessagingProvider] Simulating message send', params);
    this.counter += 1;
    return {
      id: `msg_demo_${String(this.counter).padStart(4, '0')}`,
      status: 'sent',
      timestamp: new Date().toISOString(),
      providerId: `demo-${params.channel}`,
    };
  }

  async sendBulk(params: MessageParams[]): Promise<MessageReceipt[]> {
    return Promise.all(params.map((p) => this.send(p)));
  }
}

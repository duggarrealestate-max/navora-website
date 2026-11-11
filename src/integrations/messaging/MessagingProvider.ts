export interface MessageParams {
  to: string;
  templateKey?: string;
  variables?: Record<string, unknown>;
  body?: string;
  channel: 'whatsapp' | 'sms' | 'email';
}

export interface MessageReceipt {
  id: string;
  status: 'sent' | 'delivered' | 'failed';
  timestamp: string;
  providerId?: string;
}

export interface MessagingProvider {
  send(params: MessageParams): Promise<MessageReceipt>;
  sendBulk(params: MessageParams[]): Promise<MessageReceipt[]>;
  getName(): string;
}

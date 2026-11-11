import { Header } from '@design/layout/Header';
import { Card } from '@design/components/Card';
import { Badge } from '@design/components/Badge';

export function IntegrationsPage(): JSX.Element {
  const integrations = [
    { name: 'Payment Provider', status: 'connected', description: 'Process card and bank payments' },
    { name: 'Messaging Provider', status: 'connected', description: 'Send WhatsApp and SMS notifications' },
    { name: 'Delivery Provider', status: 'connected', description: 'Track courier deliveries' },
    { name: 'Accounting Provider', status: 'demo', description: 'Sync invoices with accounting software' },
    { name: 'Authentication', status: 'demo', description: 'User authentication and security' },
  ];

  return (
    <div className="space-y-4">
      <Header 
        title="Integrations" 
        subtitle="Connect your business tools"
      />

      <div className="space-y-3">
        {integrations.map((integration) => (
          <Card key={integration.name} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-text-primary">{integration.name}</h3>
                <p className="text-xs text-text-tertiary mt-1">{integration.description}</p>
              </div>
              <Badge variant={integration.status === 'connected' ? 'success' : 'default'} size="sm">
                {integration.status === 'connected' ? 'Connected' : 'Demo'}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

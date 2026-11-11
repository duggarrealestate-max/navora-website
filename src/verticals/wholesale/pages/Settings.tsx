import { Header } from '@design/layout/Header';
import { Card } from '@design/components/Card';
import { Input } from '@design/components/Input';

export function SettingsPage(): JSX.Element {
  return (
    <div className="space-y-4">
      <Header 
        title="Settings" 
        subtitle="Manage your account & preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Business Profile</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Business Name" defaultValue="Wholesale Demo Ltd" />
              <Input label="Contact Email" defaultValue="demo@wholesale.com" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Phone" defaultValue="+44 7700 900000" />
              <Input label="Address" defaultValue="123 Trade Street, London, UK" />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Email notifications</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm border-border bg-surface text-primary focus:ring-primary" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">WhatsApp alerts</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm border-border bg-surface text-primary focus:ring-primary" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Low stock alerts</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-sm border-border bg-surface text-primary focus:ring-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Theme</h3>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 text-xs font-medium bg-primary text-white rounded-md">Dark</button>
              <button className="flex-1 px-3 py-2 text-xs font-medium bg-surface-hover text-text-secondary rounded-md hover:text-text-primary">Light</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

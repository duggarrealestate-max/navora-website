import { useState } from 'react';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Badge } from '@design/components/Badge';
import { Input } from '@design/components/Input';
import { useRetailer } from '../components/RetailerContext';
import { formatCurrency } from '@shared/utils/format';

export function AccountPage(): JSX.Element {
  const { customer, saveCustomer } = useRetailer();
  const [contactName, setContactName] = useState(customer.primaryContact);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [address, setAddress] = useState(customer.deliveryAddresses[0]?.address || '');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await saveCustomer({
      primaryContact: contactName,
      email,
      phone,
      deliveryAddresses: [{ ...customer.deliveryAddresses[0], address }],
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-text-primary tracking-tight">Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-md bg-primary flex items-center justify-center text-white text-lg font-bold">
              {customer.businessName.split(' ').map((w) => w[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary">{customer.businessName}</h3>
              <p className="text-xs text-text-secondary">{customer.name}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-tertiary uppercase tracking-wider">Account Tier</span>
              <Badge variant="warning" size="sm">Gold</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-tertiary uppercase tracking-wider">Status</span>
              <Badge variant="success" size="sm">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-tertiary uppercase tracking-wider">Trade Terms</span>
              <span className="text-xs text-text-primary">{customer.tradeTerms}</span>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Contact Details</h3>
          <div className="space-y-4">
            <Input label="Primary Contact" value={contactName} onChange={(e) => setContactName(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input label="Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <div className="flex items-center gap-3 pt-2">
              <Button onClick={handleSave}>{saved ? 'Saved ✓' : 'Save Changes'}</Button>
              <span className="text-xs text-text-tertiary">Changes are saved locally for demo purposes</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 text-sm">
            <p><span className="text-text-tertiary">Business:</span> <span className="text-text-primary">{customer.businessName}</span></p>
            <p><span className="text-text-tertiary">Credit Limit:</span> <span className="text-text-primary">{formatCurrency(customer.creditLimit)}</span></p>
            <p><span className="text-text-tertiary">Outstanding:</span> <span className="text-text-primary">{formatCurrency(customer.outstandingCredit)}</span></p>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="text-text-tertiary">Support:</span> <span className="text-text-primary">{customer.supportContact}</span></p>
            <p><span className="text-text-tertiary">Trade Terms:</span> <span className="text-text-primary">{customer.tradeTerms}</span></p>
            <p><span className="text-text-tertiary">Account Status:</span> <span className="text-text-primary capitalize">{customer.accountStatus}</span></p>
          </div>
        </div>
      </Card>
    </div>
  );
}

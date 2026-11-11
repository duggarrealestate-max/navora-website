import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Input } from '@design/components/Input';
import { Select } from '@design/components/Select';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@design/components/Table';
import { useRetailer } from '../components/RetailerContext';
import { formatCurrency } from '@shared/utils/format';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CartPage(): JSX.Element {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, placeOrder } = useRetailer();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'collection'>('collection');
  const [placing, setPlacing] = useState(false);

  const deliveryFee = deliveryMethod === 'delivery' ? 7.99 : 0;
  const orderTotal = Math.round((cartTotal + deliveryFee) * 100) / 100;

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setPlacing(true);
    const order = {
      id: `ret-ord-${Date.now()}`,
      orderNumber: `TP-${String(10485 + Math.floor(Math.random() * 100)).padStart(5, '0')}`,
      customerId: 'retailer-abc-mobiles',
      customerName: 'ABC Mobiles',
      status: 'received' as const,
      items: cart.map((i) => ({
        sku: i.sku,
        name: i.name,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        totalPrice: i.lineTotal,
      })),
      subtotal: cartTotal,
      deliveryFee,
      total: orderTotal,
      paymentMethod: 'credit',
      paymentStatus: 'pending',
      deliveryMethod,
      createdAt: new Date().toISOString(),
      expectedDelivery: new Date(Date.now() + (deliveryMethod === 'delivery' ? 2 : 0) * 24 * 60 * 60 * 1000).toISOString(),
      notes,
      channel: 'retailer-portal' as const,
    };
    await placeOrder(order);
    clearCart();
    setNotes('');
    navigate('/retailer/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Cart</h1>
        <Card className="p-8 text-center">
          <p className="text-text-tertiary">Your cart is empty</p>
          <Button className="mt-4">
            <a href="/retailer/catalogue">Browse Catalogue</a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-text-primary tracking-tight">Cart</h1>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Product</TableHeader>
              <TableHeader>SKU</TableHeader>
              <TableHeader align="right">Unit Price</TableHeader>
              <TableHeader align="center">Quantity</TableHeader>
              <TableHeader align="right">Line Total</TableHeader>
              <TableHeader align="center">Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.sku} hover>
                <TableCell className="text-sm">{item.name}</TableCell>
                <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                <TableCell align="right" className="text-sm tabular-nums">{formatCurrency(item.unitPrice)}</TableCell>
                <TableCell align="center">
                  <input
                    type="number"
                    min={1}
                    max={item.available}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.sku, parseInt(e.target.value) || 1)}
                    className="w-16 bg-surface border border-border rounded-md px-2 py-1 text-xs text-text-primary text-center focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </TableCell>
                <TableCell align="right" className="text-sm tabular-nums">{formatCurrency(item.lineTotal)}</TableCell>
                <TableCell align="center">
                  <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.sku)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-text-primary tabular-nums">{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Delivery</span>
              <span className="text-text-primary tabular-nums">{formatCurrency(deliveryFee)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-sm font-semibold text-text-primary">Order Total</span>
              <span className="text-lg font-bold text-primary">{formatCurrency(orderTotal)}</span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <Select value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value as 'delivery' | 'collection')} className="w-full">
              <option value="collection">Collection</option>
              <option value="delivery">Delivery (+£7.99)</option>
            </Select>
            <Input
              placeholder="Order notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-2">Account Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">Credit Limit</span>
                <span className="text-text-primary">{formatCurrency(5000)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary">Available</span>
                <span className="text-success">{formatCurrency(5000 - 1240)}</span>
              </div>
            </div>
          </Card>
          <Button size="lg" className="w-full" onClick={handlePlaceOrder} disabled={placing || cart.length === 0}>
            {placing ? 'Placing...' : 'Place Demo Order'}
          </Button>
          <Button variant="outline" size="sm" className="w-full" onClick={clearCart}>Clear Cart</Button>
        </div>
      </div>
    </div>
  );
}

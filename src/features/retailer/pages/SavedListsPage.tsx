import { useState } from 'react';
import { Card } from '@design/components/Card';
import { Button } from '@design/components/Button';
import { Input } from '@design/components/Input';
import { useRetailer } from '../components/RetailerContext';
import { formatCurrency } from '@shared/utils/format';
import { cn } from '@design/components/utils';

export function SavedListsPage(): JSX.Element {
  const { savedLists, addToCart, deleteSavedList, saveSavedList } = useRetailer();
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState<string | null>(null);

  const selected = savedLists.find((l) => l.id === selectedList);

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    const list = {
      id: `list-${Date.now()}`,
      name: newListName.trim(),
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveSavedList(list);
    setNewListName('');
    setSelectedList(list.id);
  };

  const handleAddListToCart = () => {
    if (!selected) return;
    for (const item of selected.items) {
      addToCart({ sku: item.sku, name: item.name, quantity: item.quantity, unitPrice: item.unitPrice, lineTotal: Math.round(item.unitPrice * item.quantity * 100) / 100, available: 999 });
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-text-primary tracking-tight">Saved Lists</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Your Lists</h3>
          <div className="space-y-2 mb-4">
            {savedLists.map((list) => (
              <div
                key={list.id}
                className={cn(
                  'flex items-center justify-between p-3 rounded-md border cursor-pointer transition-all',
                  selectedList === list.id ? 'border-primary bg-primary/10' : 'border-border hover:border-border-hover'
                )}
                onClick={() => setSelectedList(list.id)}
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">{list.name}</p>
                  <p className="text-xs text-text-tertiary">{list.items.length} items</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSavedList(list.id);
                    if (selectedList === list.id) setSelectedList(null);
                  }}
                  className="text-text-tertiary hover:text-error transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="New list name..." value={newListName} onChange={(e) => setNewListName(e.target.value)} className="flex-1" />
            <Button size="sm" onClick={handleCreateList} disabled={!newListName.trim()}>Create</Button>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-5">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-text-primary">{selected.name}</h3>
                <Button size="sm" onClick={handleAddListToCart} disabled={selected.items.length === 0}>Add All to Cart</Button>
              </div>
              {selected.items.length === 0 ? (
                <p className="text-sm text-text-tertiary text-center py-8">This list is empty. Add products from the catalogue.</p>
              ) : (
                <div className="space-y-2">
                  {selected.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{item.name}</p>
                        <p className="text-xs text-text-tertiary">{item.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-text-primary">{item.quantity} × {formatCurrency(item.unitPrice)}</p>
                        <p className="text-xs text-text-tertiary">{formatCurrency(Math.round(item.unitPrice * item.quantity * 100) / 100)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
                    <span className="text-sm font-semibold text-text-primary">List Total</span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(Math.round(selected.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0) * 100) / 100)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-tertiary">Select a list to view its contents</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { RetailerShell } from '../components/RetailerShell';
import { RetailerProvider, useRetailer } from '../components/RetailerContext';
import { RetailerHome } from './RetailerHome';
import { CataloguePage } from './CataloguePage';
import { ProductDetailPage } from './ProductDetailPage';
import { QuickOrderPage } from './QuickOrderPage';
import { CartPage } from './CartPage';
import { OrdersPage } from './OrdersPage';
import { OrderDetailPage } from './OrderDetailPage';
import { InvoicesPage } from './InvoicesPage';
import { CreditPage } from './CreditPage';
import { SavedListsPage } from './SavedListsPage';
import { AIAssistantPage } from './AIAssistantPage';
import { AccountPage } from './AccountPage';

function RetailerRoutesInner(): JSX.Element {
  const { cartItemCount } = useRetailer();
  const navigate = useNavigate();

  return (
    <RetailerShell cartItemCount={cartItemCount} onCartClick={() => navigate('/retailer/cart')}>
      <Routes>
        <Route index element={<RetailerHome />} />
        <Route path="catalogue" element={<CataloguePage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="quick-order" element={<QuickOrderPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrderDetailPage />} />
        <Route path="invoices" element={<InvoicesPage />} />
        <Route path="credit" element={<CreditPage />} />
        <Route path="saved" element={<SavedListsPage />} />
        <Route path="ai-assistant" element={<AIAssistantPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="*" element={<Navigate to="/retailer" replace />} />
      </Routes>
    </RetailerShell>
  );
}

export function RetailerPage(): JSX.Element {
  return (
    <RetailerProvider>
      <RetailerRoutesInner />
    </RetailerProvider>
  );
}

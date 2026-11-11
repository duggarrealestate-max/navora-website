import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import React from 'react';
import { ProviderContext } from '@app/providers/ProviderContext';
import { DemoDataProvider } from '@app/providers/DemoContext';
import { AppShell } from '@design/layout/AppShell';
import { PublicShell } from '@public/layouts/PublicShell';
import { CommandCentre } from '@vertical/wholesale/pages/CommandCentre';
import { CommercePage, ProductDetailPage as CommerceProductDetailPage, CartPage as CommerceCartPage } from '@vertical/wholesale/pages/Commerce';
import { CustomersPage, CustomerDetailPage } from '@vertical/wholesale/pages/Customers';
import { OrdersPage, OrderDetailPage as CommerceOrderDetailPage } from '@vertical/wholesale/pages/Orders';
import { InventoryPage } from '@vertical/wholesale/pages/Inventory';
import { RetentionPage } from '@vertical/wholesale/pages/Retention';
import { AutomationPage, WorkflowDetailPage } from '@vertical/wholesale/pages/Automation';
import { AISalesAssistantPage } from '@vertical/wholesale/pages/AISalesAssistant';
import { AnalyticsPage } from '@vertical/wholesale/pages/Analytics';
import { TeamPage } from '@vertical/wholesale/pages/Team';
import { IntegrationsPage } from '@vertical/wholesale/pages/Integrations';
import { SettingsPage } from '@vertical/wholesale/pages/Settings';
import { DiscoveryPage } from '@features/discovery/pages/DiscoveryPage';
import { RetailerPage } from '@features/retailer/pages/RetailerPage';

const LandingPage = React.lazy(() => import('@public/pages/LandingPage'));
const SolutionsPage = React.lazy(() => import('@public/pages/SolutionsPage'));
const IndustriesPage = React.lazy(() => import('@public/pages/IndustriesPage'));
const HowItWorksPage = React.lazy(() => import('@public/pages/HowItWorksPage'));
const AboutPage = React.lazy(() => import('@public/pages/AboutPage'));
const ContactPage = React.lazy(() => import('@public/pages/ContactPage'));
const PrivacyPage = React.lazy(() => import('@public/pages/PrivacyPage'));
const TermsPage = React.lazy(() => import('@public/pages/TermsPage'));
const NotFoundPage = React.lazy(() => import('@public/pages/NotFoundPage'));

function PublicSuspense({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-graphite flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-silver/20 border-t-soft-cyan rounded-full animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default function App(): JSX.Element {
  return (
    <ProviderContext>
      <DemoDataProvider>
        <Router>
          <Routes>
            <Route element={<PublicShell />}>
              <Route index element={
                <PublicSuspense>
                  <LandingPage />
                </PublicSuspense>
              } />
              <Route
                path="solutions"
                element={
                  <PublicSuspense>
                    <SolutionsPage />
                  </PublicSuspense>
                }
              />
              <Route
                path="industries"
                element={
                  <PublicSuspense>
                    <IndustriesPage />
                  </PublicSuspense>
                }
              />
              <Route
                path="how-it-works"
                element={
                  <PublicSuspense>
                    <HowItWorksPage />
                  </PublicSuspense>
                }
              />
              <Route
                path="about"
                element={
                  <PublicSuspense>
                    <AboutPage />
                  </PublicSuspense>
                }
              />
              <Route
                path="contact"
                element={
                  <PublicSuspense>
                    <ContactPage />
                  </PublicSuspense>
                }
              />
              <Route
                path="privacy"
                element={
                  <PublicSuspense>
                    <PrivacyPage />
                  </PublicSuspense>
                }
              />
              <Route
                path="terms"
                element={
                  <PublicSuspense>
                    <TermsPage />
                  </PublicSuspense>
                }
              />
              <Route path="services" element={<Navigate to="/solutions" replace />} />
              <Route path="work" element={<Navigate to="/industries" replace />} />
              <Route path="process" element={<Navigate to="/how-it-works" replace />} />
              <Route path="*" element={
                <PublicSuspense>
                  <NotFoundPage />
                </PublicSuspense>
              } />
            </Route>
            <Route element={<AppShell />}>
              <Route path="command-centre" element={<CommandCentre />} />
              <Route path="commerce" element={<CommercePage />} />
              <Route path="commerce/product/:sku" element={<CommerceProductDetailPage />} />
              <Route path="commerce/cart" element={<CommerceCartPage />} />
              <Route path="customers" element={<CustomersPage />} />
              <Route path="customers/:id" element={<CustomerDetailPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:id" element={<CommerceOrderDetailPage />} />
              <Route path="inventory" element={<InventoryPage />} />
              <Route path="retention" element={<RetentionPage />} />
              <Route path="automation" element={<AutomationPage />} />
              <Route path="automation/:workflowId" element={<WorkflowDetailPage />} />
              <Route path="ai-sales-assistant" element={<AISalesAssistantPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="integrations" element={<IntegrationsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="/discovery" element={<DiscoveryPage />} />
            <Route path="/discovery/result" element={<DiscoveryPage />} />
            <Route path="/retailer/*" element={<RetailerPage />} />
             <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DemoDataProvider>
    </ProviderContext>
  );
}

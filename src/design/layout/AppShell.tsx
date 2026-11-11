import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar, CommandPalette } from './Topbar';
import { useDemoNavigation } from '@demo/data/nav';
import { DemoModeSwitch } from '@features/retailer/components/DemoModeSwitch';

export function AppShell(): JSX.Element {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { navSections, commandItems } = useDemoNavigation();

  const nav = navSections;

  return (
    <div className="flex h-screen bg-background text-text-primary">
      <Sidebar
        nav={nav}
        _currentVertical="wholesale"
        isCollapsed={sidebarCollapsed}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
          user={{ name: 'Alex Harper', role: 'Owner' }}
          notifications={[]}
          onSearch={() => setCommandPaletteOpen(true)}
          rightActions={<DemoModeSwitch />}
        />

        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        items={commandItems}
        onSelectItem={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}

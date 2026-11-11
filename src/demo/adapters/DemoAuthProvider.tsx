import type { AuthProvider, AuthUser } from '@integrations/auth/AuthProvider';

export class DemoAuthProvider implements AuthProvider {
  getName(): string {
    return 'Demo Auth Provider (no real login)';
  }

  async login(): Promise<AuthUser> {
    return {
      id: 'user-001',
      email: 'a.harper@demo-wholeos.com',
      name: 'Alex Harper',
      role: 'owner',
      avatar: undefined,
      permissions: ['customer:read', 'order:write', 'inventory:manage', 'analytics:view', 'team:manage', 'settings:edit'],
    };
  }

  async logout(): Promise<void> {
    // Simulate async
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    return {
      id: 'user-001',
      email: 'a.harper@demo-wholeos.com',
      name: 'Alex Harper',
      role: 'owner',
      permissions: ['customer:read', 'order:write', 'inventory:manage', 'analytics:view', 'team:manage', 'settings:edit'],
    };
  }

  async getUserPermissions(): Promise<string[]> {
    return [
      'customer:read',
      'customer:write',
      'order:read',
      'order:write',
      'inventory:read',
      'inventory:manage',
      'analytics:view',
      'team:manage',
      'settings:edit',
    ];
  }
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'sales-manager' | 'sales-rep' | 'warehouse';
  avatar?: string;
  permissions: string[];
}

export interface AuthProvider {
  login(credentials: { email: string; password: string }): Promise<AuthUser>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
  getUserPermissions(): Promise<string[]>;
  getName(): string;
}

export type CurrencyCode = 'GBP' | 'USD' | 'EUR' | 'CAD' | 'AUD';
export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type SortOrder = 'asc' | 'desc';

export interface Timestamped {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

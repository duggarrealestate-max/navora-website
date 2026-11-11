import { clsx } from '@shared/utils/format';

export { clsx };

export function cn(...classes: (string | false | undefined | null)[]): string {
  return clsx(...classes);
}

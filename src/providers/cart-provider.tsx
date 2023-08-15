import { ReactNode } from 'react';
import { CartProvider as CrtProv } from '@/context';

export default function CartProvider({ children }: { children: ReactNode }) {
  return <CrtProv>{children}</CrtProv>;
}

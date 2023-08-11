import { Suspense } from 'react';

export interface IProductsLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProductsLayoutProps) {
  return (
    <div>
      <Suspense fallback={<p>Loading... products</p>}>{children}</Suspense>
    </div>
  );
}

import { Suspense, Fragment } from 'react';
import Header from './header';
import Loading from './loading';
import dynamic from 'next/dynamic';

const FilterSection = dynamic(() => import('./filter-section'), {
  ssr: false,
  loading: () => <Loading.ListOfFilter />,
});

export interface IProductsLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProductsLayoutProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="grid md:grid-cols-[270px_minmax(900px,_1fr)_100px] gap-4">
        <FilterSection />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}

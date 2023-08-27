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
    <Fragment>
      <Header />
      <div className="grid md:grid-cols-[250px_minmax(900px,_1fr)] gap-4">
        <FilterSection />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </Fragment>
  );
}

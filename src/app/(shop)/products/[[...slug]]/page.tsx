import dynamic from 'next/dynamic';
import Loading from '../loading';

const ProductWrapper = dynamic(() => import('@/components/product-wrapper'), {
  ssr: false,
  loading: () => <Loading />,
});

export interface IProductsPageProps {
  params: {
    slug: string[];
  };
}

export default async function Products({
  params: { slug },
}: IProductsPageProps) {
  return <ProductWrapper slug={slug} />;
}

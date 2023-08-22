import { Fragment } from 'react';
import ProductCard, { ICardProps } from '@/components/product-card';
import { ProductWrapper } from '@/components';

export interface IProductsPageProps {
  params: {
    slug: string | string[];
  };
}

const getProducts = async (params: string | string[]) => {
  let url = `${process.env.API_URL}/api/products`;

  if (params !== undefined) {
    url += `?categories_slug=${params}`;
  }

  return (await (await fetch(url, { cache: 'no-cache' })).json())
    .products as ICardProps[];
};

export default async function Products({
  params: { slug },
}: IProductsPageProps) {
  const products = await getProducts(slug);

  return (
    <Fragment>
      {products && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 col-span-1">
          <ProductWrapper products={products} />
        </div>
      )}
      {!products && <p>No products for {JSON.stringify(slug)}</p>}
    </Fragment>
  );
}

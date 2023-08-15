import { Fragment } from 'react';
import ProductCard, { CardProps } from '@/components/product-card';
import { ProductWrapper } from '@/components';

export interface IProductsPageProps {
  params: {
    slug: string | string[];
  };
}

const getProducts = async (params: string | string[]) => {
  let url = 'http://localhost:3000/api/products';

  if (params !== undefined) {
    url += `?categories_slug=${params}`;
  }

  return (await (await fetch(url, { cache: 'no-cache' })).json())
    .products as CardProps[];
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

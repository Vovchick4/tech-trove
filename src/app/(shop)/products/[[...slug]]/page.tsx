import { Suspense } from 'react';
import Image from 'next/image';

import { Spinner } from '@/components';
import { CardProps } from '@/components/product-card';

export interface IProductsPageProps {
  params: {
    slug: string | string[];
  };
}

const getProducts = async (params: string | string[]) => {
  let url = 'http://localhost:3000/api/products';

  if (params !== undefined) {
    url += `?sub_categories_ids=${params}`;
  }

  return (await (await fetch(url, { cache: 'no-cache' })).json())
    .products as CardProps[];
};

export default async function Products({
  params: { slug },
}: IProductsPageProps) {
  const products = await getProducts(slug);

  return (
    <div>
      {products && (
        <ul>
          {products.map(({ name, preview }, i) => (
            <li key={i}>
              {name}
              <Suspense fallback={<Spinner />}>
                <Image
                  loading="lazy"
                  width={400}
                  height={400}
                  src={preview}
                  alt={name}
                />
              </Suspense>
            </li>
          ))}
        </ul>
      )}
      {!products && <p>No products for {JSON.stringify(slug)}</p>}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import { Spinner } from '.';
import { useCart } from '@/context/cart-context';
import { useDocumentScrollEnd } from '@/hooks';
import ProductCard, { ICardProps } from './product-card';

const PER_PAGE = 6;

export default function ProductWrapper({ slug }: { slug: string[] }) {
  const [count, setCount] = useState<number>(0);
  const { cart, addToCart } = useCart();
  const isDocSrollEnd = useDocumentScrollEnd();

  const {
    data: products,
    size,
    setSize,
    isLoading,
    isValidating,
  } = useSWRInfinite(
    (index) => {
      const url = new URL(window.origin + '/api/products');
      if (slug) {
        url.searchParams.set('categories_slug', slug.toString());
      }
      url.searchParams.set('page', (index + 1).toString());
      return url.href;
    },
    (url) =>
      fetch(url).then(async (res) => {
        const json = (await res.json()).products;
        setCount(json.count);
        return json?.data;
      })
  );

  useEffect(() => {
    if (isDocSrollEnd && Math.ceil(count / PER_PAGE) !== size) {
      setSize(size + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDocSrollEnd]);

  const issues: ICardProps[] = products ? [].concat(...products) : [];
  const isEmpty = products?.length === 0;

  return (
    <div className="relative">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 col-span-1">
        {!isLoading &&
          issues &&
          issues.map((product, index) => (
            <div key={index}>
              <ProductCard
                {...product}
                cartItem={
                  cart.find((c) => c.slug === product.slug) || undefined
                }
                addToCart={addToCart}
              />
            </div>
          ))}
      </div>
      {isEmpty && (
        <p>Not found products by {JSON.stringify(slug)} categories</p>
      )}
      {isValidating && size + 1 !== 1 && (
        <div className="absolute -bottom-8 left-1/2 -transform-x-1/2">
          <Spinner />
        </div>
      )}
    </div>
  );
}

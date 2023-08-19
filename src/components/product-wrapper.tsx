'use client';

import { ReactNode } from 'react';
import ProductCard, { ICardProps } from './product-card';
import { useCart } from '@/context/cart-context';

export default function ProductWrapper({
  children,
  products,
}: {
  children?: ReactNode;
  products: ICardProps[];
}) {
  const { addToCart } = useCart();

  return (
    products &&
    products.map((product, index) => (
      <div key={index}>
        <ProductCard {...product} addToCart={addToCart} />
      </div>
    ))
  );
}

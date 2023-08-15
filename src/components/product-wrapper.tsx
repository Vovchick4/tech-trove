'use client';

import { ReactNode } from 'react';
import ProductCard, { CardProps } from './product-card';
import { useCart } from '@/context/cart-context';

export default function ProductWrapper({
  children,
  products,
}: {
  children?: ReactNode;
  products: CardProps[];
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

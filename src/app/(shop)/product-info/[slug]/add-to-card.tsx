'use client';

import { useMemo } from 'react';

import { Button } from '@/components';
import { useCart } from '@/context/cart-context';
import { ICardProps } from '@/components/product-card';

export default function AddToCard({
  name,
  describe,
  price,
  slug,
  preview,
}: ICardProps) {
  const { cart, addToCart } = useCart();
  const inCart = useMemo(() => cart.find((c) => c.slug === slug), [cart, slug]);

  return (
    <div className="m-3 ">
      <Button
        roundedFull
        fullWidth
        variant="outline"
        color="info"
        onClick={() => addToCart({ name, describe, price, slug, preview })}
      >
        Add to Card {inCart && inCart.count}
      </Button>
    </div>
  );
}

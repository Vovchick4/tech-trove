'use client';

import { Button } from '@/components';
import { ICardProps } from '@/components/product-card';
import { useCart } from '@/context/cart-context';

export default function AddToCard({
  name,
  describe,
  price,
  slug,
  preview,
}: ICardProps) {
  const { addToCart } = useCart();

  return (
    <div className="m-3 ">
      <Button
        roundedFull
        fullWidth
        variant="outline"
        color="info"
        onClick={() => addToCart({ name, describe, price, slug, preview })}
      >
        Add to Card
      </Button>
    </div>
  );
}

'use client';

import { useCart } from '@/context/cart-context';

export default function PriceWrapper({ label }: { label: string }) {
  const { findTotalPrice } = useCart();

  return (
    <div className="flex justify-between text-lg font-bold mb-4">
      <p>{label}</p>
      <p>{findTotalPrice()}$</p>
    </div>
  );
}

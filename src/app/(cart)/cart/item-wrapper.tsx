'use client';

import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';

import { Button } from '@/components';
import { useCart } from '@/context/cart-context';

export default function ItemWrapper() {
  const { cart, increment, decrement, removeFromCart, findProductPrice } =
    useCart();

  if (cart.length === 0) {
    return <p>Your Cart Is Empty!</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {cart.map(({ slug, name, price, preview, count }) => (
        <li key={slug}>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              {preview && (
                <Image
                  className="rounded-md"
                  src={preview}
                  width={83}
                  height={43}
                  alt={name}
                />
              )}
              <div>
                <p>{name}</p>
                <p className="mt-2">{price}$</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              Count items: {count}, {findProductPrice(slug)}$
              <Button
                variant="ghost"
                color="blackedOpacity"
                leftIcon={<IoMdClose size={22} />}
                onClick={() => removeFromCart(slug)}
              ></Button>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button
              isDisabled={count === 1}
              variant="outline"
              size="small"
              onClick={() => decrement(slug)}
            >
              -
            </Button>
            <Button
              variant="outline"
              size="small"
              onClick={() => increment(slug)}
            >
              +
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

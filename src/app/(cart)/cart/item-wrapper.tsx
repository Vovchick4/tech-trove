'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Id, toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io';

import { Button } from '@/components';
import { useCart } from '@/context/cart-context';
import { useCheckOutFormData } from '@/context/payment-form-data-context';

const fetchOrder = async (
  clientSecret: string,
  payment_intent: string,
  data: any
) => {
  return await fetch(`/api/payment/${payment_intent}/${clientSecret}`, {
    method: 'POST',
    body: JSON.stringify(data),
    cache: 'no-cache',
  });
};

export default function ItemWrapper() {
  const toastId = useRef<Id | null>(null);
  const { data, status } = useSession();
  const { email, isPaymentOrder, onDataChange } = useCheckOutFormData();
  const searchparam = useSearchParams();
  const {
    cart,
    increment,
    decrement,
    removeFromCart,
    findProductPrice,
    clearCart,
  } = useCart();

  useEffect(() => {
    if (
      !searchparam.get('payment_intent_client_secret') ||
      !searchparam.get('payment_intent') ||
      !toastId ||
      !email ||
      !isPaymentOrder ||
      cart.length === 0
    )
      return;

    if (status === 'loading') return;

    toastId.current = toast('Loading... Order!', {
      isLoading: true,
      autoClose: false,
    });

    fetchOrder(
      searchparam.get('payment_intent_client_secret') as string,
      searchparam.get('payment_intent') as string,
      {
        user_email: email,
        user_id:
          status === 'authenticated' ? (data as any)?.session?.email : null,
        items: cart,
      }
    )
      .then(async (res) => {
        if (!((await res.json())?.message as string | null)) {
          clearCart();
          onDataChange<boolean>(false, 'isPaymentOrder');
          toast.update(toastId.current as Id, {
            render: 'A new awesome order!',
            type: toast.TYPE.SUCCESS,
            isLoading: false,
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        toast.update(toastId.current as Id, {
          render: (error as Error).message,
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 5000,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, email, isPaymentOrder, status]);

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
              Count items: {count}, {findProductPrice(slug).toFixed(2)}$
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

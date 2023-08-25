'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PaymentIntent } from '@stripe/stripe-js';

import { Spinner } from '@/components';
import { useCart } from '@/context/cart-context';
import { ICardProps } from '@/components/product-card';

export interface IOrder {
  id: string;
  user_email: string;
  payment_intent: string;
  total_price: number;
  items: ICardProps[];
}

export default function GetOrder({
  payment_intent,
  payment_intent_client_secret,
}: {
  payment_intent: string;
  payment_intent_client_secret: string;
}) {
  const { cart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [{ payment, order }, setPayment] = useState<{
    payment: PaymentIntent | undefined;
    order: IOrder | null;
  }>({ payment: undefined, order: null });

  useEffect(() => {
    if (cart.length === 0 || !payment_intent || !payment_intent_client_secret) {
      return;
    }

    (async () => {
      fetch(
        '/api/payment/' + `${payment_intent}/${payment_intent_client_secret}`,
        { method: 'POST', body: JSON.stringify({ products: cart }) }
      )
        .then((res) => {
          res
            .json()
            .then(
              (res: { payment: PaymentIntent | undefined; order: IOrder }) => {
                console.log('🚀 ~ file: get-order.tsx:49 ~ .then ~ res:', res);
                setPayment({ payment: res.payment, order });
              }
            );
        })
        .finally(() => setIsLoading(false));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, payment_intent, payment_intent_client_secret, clearCart]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!payment_intent || !payment_intent_client_secret) {
    notFound();
  }

  return (
    <div className="max-7xl mx-auto flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold text-green-500">
        Order success created!
      </h1>
      <h2 className="mt-2 font-bold text-green-700">
        Payment id: {payment?.id}
      </h2>
      <div className="grid grid-cols-3 gap-8 mt-3">
        <div className="text-center p-2 rounded-md bg-green-400/75 dark:bg-green-400/25">
          <h2>Amount:</h2>
          <p>{((payment?.amount as number) / 100) as number}</p>
          <p>Status: {payment?.status}</p>
        </div>
        <div className="text-center p-2 rounded-md bg-green-400/75 dark:bg-green-400/25">
          <h2>Data of Currency:</h2>
          <p>${payment?.currency}</p>
        </div>
        <div className="text-center p-2 rounded-md bg-green-400/75 dark:bg-green-400/25">
          <h2>Description:</h2>
          <p>{payment?.description}</p>
        </div>
      </div>
      <h2>Purches:</h2>
      {order && order?.items.length > 0 && (
        <ul>
          {order.items.map(({ name, slug }) => (
            <li key={slug}>{name}</li>
          ))}
        </ul>
      )}
      <Link
        className="mt-4 p-2 ring-4 ring-gray-900 text-gray-900 dark:text-white hover:text-white dark:hover:text-white hover:bg-gray-900 transition-colors rounded-lg"
        href="/"
      >
        Back to home!
      </Link>
    </div>
  );
}

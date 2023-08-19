'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PaymentIntent } from '@stripe/stripe-js';

import { Spinner } from '@/components';
import { useCart } from '@/context/cart-context';

export default function GetOrder({
  payment_intent,
  payment_intent_client_secret,
}: {
  payment_intent: string;
  payment_intent_client_secret: string;
}) {
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [payment, setPayment] = useState<PaymentIntent | undefined>(undefined);

  useEffect(() => {
    if (!payment_intent || !payment_intent_client_secret) {
      return;
    }

    (async () => {
      fetch(
        '/api/payment/' + `${payment_intent}/${payment_intent_client_secret}`
      )
        .then((res) => {
          res.json().then((res: PaymentIntent | undefined) => {
            if (res?.status === 'succeeded') {
              clearCart();
              setPayment(res);
            }
          });
        })
        .finally(() => setIsLoading(false));
    })();
  }, [payment_intent, payment_intent_client_secret, clearCart]);

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
          <h2>Amount: {payment?.status}</h2>
          <p>{payment?.amount}</p>
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
      <Link
        className="mt-4 p-2 ring-4 ring-gray-900 text-gray-900 dark:text-white hover:text-white dark:hover:text-white hover:bg-gray-900 transition-colors rounded-lg"
        href="/"
      >
        Back to home!
      </Link>
    </div>
  );
}

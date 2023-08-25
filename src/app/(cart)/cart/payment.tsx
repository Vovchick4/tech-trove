'use client';

import { Fragment, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance } from '@stripe/stripe-js/types';

import { Spinner } from '@/components';
import CheckoutForm from './checkout-form';
import { useCart } from '@/context/cart-context';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const appearance: Appearance = {
  theme: 'stripe',
};

export default function Payment() {
  const { cart, findTotalPrice } = useCart();
  const [dataSecret, setClientSecret] = useState<{
    clientSecret: string;
    paymentID: string;
  }>({ clientSecret: '', paymentID: '' });
  const [isCreatingPayment, setIsCreatingPayment] = useState(true);

  useEffect(() => {
    (async () => {
      // Create PaymentIntent as soon as the page loads
      const response = await fetch('/api/payment', {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({ items: cart, totalPrice: findTotalPrice() }),
      });
      const data = await response.json();
      setClientSecret(data);
      setIsCreatingPayment(false);
    })();
  }, [cart, findTotalPrice]);

  const options = {
    clientSecret: dataSecret.clientSecret,
    appearance,
  };

  return (
    <Fragment>
      {isCreatingPayment && <Spinner text="Creating payment..." />}
      {!isCreatingPayment && options.clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            payId={dataSecret.paymentID}
            clientSecret={options.clientSecret}
          />
        </Elements>
      )}
    </Fragment>
  );
}

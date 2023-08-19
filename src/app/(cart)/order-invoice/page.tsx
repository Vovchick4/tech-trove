import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PaymentIntent } from '@stripe/stripe-js';

export default async function Page({
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
    redirect_status: string;
  };
}) {
  const payment: PaymentIntent | undefined = await (
    await fetch(
      'http://localhost:3000/api/payment' + `/${searchParams.payment_intent}`,
      { cache: 'no-cache' }
    )
  ).json();

  if (!payment && !searchParams.payment_intent) {
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

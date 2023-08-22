import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { Spinner } from '@/components';

const Order = dynamic(() => import('./get-order'), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function Page({
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
    redirect_status: string;
  };
}) {
  const { payment_intent, payment_intent_client_secret } = searchParams;

  if (!payment_intent || !payment_intent_client_secret) {
    notFound();
  }

  return (
    <Order
      payment_intent={payment_intent}
      payment_intent_client_secret={payment_intent_client_secret}
    />
  );
}

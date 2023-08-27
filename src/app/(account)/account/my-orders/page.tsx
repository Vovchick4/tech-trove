import dynamic from 'next/dynamic';
import { getServerSession } from 'next-auth';

import { Spinner } from '@/components';
import { IUser } from '@/components/list-item';
import { authOptions } from '@/app/api/lib/auth-options';
import { StatusOrder } from '@/app/(cart)/order-invoice/get-order';
import { countOrdersByStatus } from './utils';

const GetOrders = dynamic(() => import('./orders'), {
  ssr: false,
  loading: () => <Spinner />,
});

export default async function MyOrders() {
  const { user } = (await getServerSession(authOptions)) as { user: IUser };

  return (
    <div>
      <h2 className="flex items-center justify-between text-lg">
        MyOrders:
        <figure className="flex items-center gap-4">
          <p className="px-6 py-1.5 rounded-2xl bg-green-800 text-sm">
            Paids: {countOrdersByStatus(user.Order, 'paid')}
          </p>
          <p className="px-6 py-1.5 rounded-2xl bg-red-800 text-sm">
            No paids: {countOrdersByStatus(user.Order, 'no_paid')}
          </p>
        </figure>
      </h2>
      {user.Order?.length > 0 ? (
        <div className="mt-3">
          <GetOrders orders={user.Order} />
        </div>
      ) : (
        <p>Not orders yet!</p>
      )}
    </div>
  );
}

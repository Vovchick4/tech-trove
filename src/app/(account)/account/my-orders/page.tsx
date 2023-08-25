import OrderTable from '@/components/order-table';
import { Fragment } from 'react';

export default function MyOrders() {
  return (
    <Fragment>
      <div className="flex flex-col">
        <h1 className="mt-4 text-slate-800 font-bold text-xl dark:text-white md:mt-0">
          My orders
        </h1>
        <OrderTable />
      </div>
    </Fragment>
  );
}

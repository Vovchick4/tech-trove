'use client';

import { Accardion } from '@/components';
import { IOrder } from '@/app/(cart)/order-invoice/get-order';

export interface IGetOrderProps {
  orders: IOrder[];
}

export default function orders({ orders }: IGetOrderProps) {
  return orders.map(({ id, items, total_price }) => (
    <Accardion
      key={id}
      title={
        <div className="flex items-center justify-between">
          <p>{`Order id, ${id}`}</p>
          <p>{total_price}</p>
        </div>
      }
      list={items}
      RenderLabelList={({ id, name }) => id + ' ' + name}
    />
  ));
}

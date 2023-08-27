'use client';

import { Accardion } from '@/components';
import { IOrder } from '@/app/(cart)/order-invoice/get-order';

export interface IGetOrderProps {
  orders: IOrder[];
}

export default function Orders({ orders }: IGetOrderProps) {
  return orders.map(({ id, items, total_price }) => (
    <Accardion
      key={id}
      title={<p>{`Order id, ${id.slice(12)}`}</p>}
      rightTitle={`${total_price}$`}
      list={items}
      RenderLabelList={({ name, price, count, i }) => (
        <p className="flex justify-between">
          <span>
            #{i + 1}, {name}, {price}$
          </span>
          <span>
            {count}x, {Number(Math.ceil(count * price))}$
          </span>
        </p>
      )}
    />
  ));
}

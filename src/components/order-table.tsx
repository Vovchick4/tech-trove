'use client';

import React, { useState } from 'react';
import { Input } from '@/components';
import PC from '../../public/PC-image-category.jpg';

interface IOrder {
  id: number;
  orderNumber: string;
  orderDate: string;
  status: string;
  price: number;
  items: IOrderItem[];
}

interface IOrderItem {
  id: number;
  image: string;
  productName: string;
  price: number;
  quantity: number;
}

const orders: IOrder[] = [
  {
    id: 1,
    orderNumber: '123',
    orderDate: '2023-08-25',
    status: 'Completed',
    price: 600,
    items: [
      { id: 1, image: PC.src, productName: 'PR1', price: 300, quantity: 1 },
      { id: 2, image: PC.src, productName: 'PR3', price: 300, quantity: 1 },
    ],
  },
  {
    id: 2,
    orderNumber: '124',
    orderDate: '2023-08-26',
    status: 'Pending',
    price: 1500,
    items: [
      { id: 1, image: PC.src, productName: 'PR2', price: 500, quantity: 3 },
    ],
  },
];

const OrderTable: React.FC = () => {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [searchOrderNumber, setSearchOrderNumber] = useState<string>('');

  const handleRowClick = (orderId: number) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.includes(searchOrderNumber)
  );

  return (
    <div>
      <div className="flex flex-row justufy-end ">
        <Input
          className=" h-[3rem] m-2"
          type="text"
          placeholder="Search by Order Number"
          roundedFull
          value={searchOrderNumber}
          onChange={(e) => setSearchOrderNumber(e.target.value)}
        />
      </div>
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-xm text-center text-gray-500 dark:text-gray-400 shadow-md">
          <thead className="text-l text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Order Number</th>
              <th className="px-6 py-3">Order Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr
                  className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  onClick={() => handleRowClick(order.id)}
                >
                  <td className="px-6 py-4">{order.orderNumber}</td>
                  <td className="px-6 py-4">{order.orderDate}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">{order.price}</td>
                </tr>
                {expandedOrderId === order.id && (
                  <tr>
                    <td colSpan={4}>
                      <table className="w-full text-xm text-center text-gray-500 dark:text-gray-400 shadow-md">
                        <thead className="text-l text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th className="p-3 ">#</th>
                            <th className="p-3 ">Image</th>
                            <th className="p-3 ">Product Name</th>
                            <th className="p-3 ">Price</th>
                            <th className="p-3 ">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr
                              className="bg-white border-b dark:bg-gray-700 dark:border-gray-600"
                              key={item.id}
                            >
                              <td className="p-2 text-black dark:text-white">
                                {item.id}
                              </td>
                              <td className="flex justify-center">
                                <img
                                  src={item.image}
                                  alt={item.productName}
                                  className="w-15 h-20"
                                />
                              </td>
                              <td className="p-2 text-black dark:text-white">
                                {item.productName}
                              </td>
                              <td className="p-2 ">{item.price}</td>
                              <td className="p-2 ">{item.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;

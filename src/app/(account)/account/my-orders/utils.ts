import { IOrder } from "@/app/(cart)/order-invoice/get-order";

export const countOrdersByStatus = (orders: IOrder[], status: string) => (orders.filter(c => c.status === status).length)
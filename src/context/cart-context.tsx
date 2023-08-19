'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useLocalStorage } from '@/hooks';
import { ICardProps } from '@/components/product-card';

export interface ICart extends ICardProps {
  count: number;
}

export interface ICartContext {
  cart: ICart[];
  addToCart: (data: ICardProps) => void;
  removeFromCart: (slug: string) => void;
  increment: (slug: string) => void;
  decrement: (slug: string) => void;
  findTotalPrice: () => number;
  findProductPrice: (slug: string) => number;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

export function useCart() {
  return useContext(CartContext);
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ICart[]>([]);
  const [data, setData] = useLocalStorage<ICart[]>('cart', []);

  useEffect(() => {
    setCart(data);
  }, [data, setCart]);

  function addToCart(props: ICardProps) {
    if (data.find(({ slug }) => slug === props.slug)) {
      increment(props.slug);
    } else {
      setData((prev) => [...prev, { ...props, count: 1 }]);
    }
  }

  function increment(indeficator: string) {
    setData((prev) =>
      prev.map((item) =>
        item.slug === indeficator ? { ...item, count: item.count + 1 } : item
      )
    );
  }

  function decrement(indeficator: string) {
    setData((prev) =>
      prev.map((item) =>
        item.slug === indeficator ? { ...item, count: item.count - 1 } : item
      )
    );
  }

  function removeFromCart(indeficator: string) {
    setData((prev) => prev.filter(({ slug }) => slug !== indeficator));
  }

  function findTotalPrice() {
    return data.reduce(
      (prevValue, nextValue) => nextValue.price * nextValue.count + prevValue,
      0
    );
  }

  function findProductPrice(indeficator: string) {
    const curr = data.find((item) => item.slug === indeficator);
    if (curr) {
      return curr?.price * curr.count;
    }
    return 0;
  }

  function clearCart() {
    setData([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        findTotalPrice,
        findProductPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

'use client';

import { useLocalStorage } from '@/hooks';
import React from 'react';

interface IThemeContext {
  email: string;
  isPaymentOrder: boolean;
  onDataChange: <T = string>(e: T, name: string) => void;
}

const ThemeContext = React.createContext<IThemeContext>({} as IThemeContext);

interface IThemeProvider {
  children: React.ReactNode;
}

export function useCheckOutFormData() {
  return React.useContext(ThemeContext);
}

export default function CheckoutFormDataProvider({ children }: IThemeProvider) {
  const [payOrder, setPayOrder] = React.useState<
    Pick<IThemeContext, 'email' | 'isPaymentOrder'>
  >({
    email: '',
    isPaymentOrder: false,
  });
  const [data, setData] = useLocalStorage<
    Pick<IThemeContext, 'email' | 'isPaymentOrder'>
  >('paymentOrder', { email: '', isPaymentOrder: false });

  React.useEffect(() => {
    setPayOrder(data);
  }, [data, setPayOrder]);

  function onChange<T = string>(e: T, name: string) {
    setData((prev) => ({ ...prev, [name]: e }));
  }

  return (
    <ThemeContext.Provider value={{ ...payOrder, onDataChange: onChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

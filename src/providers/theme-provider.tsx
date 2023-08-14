'use client';

import { ThemeProvider as Providers } from 'next-themes';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers attribute="class">{children}</Providers>;
}

import { Suspense } from 'react';
import Loading from '../loading';

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      ProductLayout
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}

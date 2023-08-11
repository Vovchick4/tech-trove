import { Spinner } from '@/components';

export default function Loading() {
  return (
    <div className="fixed top-1/2 right-1/2 -transform-1/2 z-50">
      <Spinner />
    </div>
  );
}

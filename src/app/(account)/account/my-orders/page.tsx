import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/lib/auth-options';

export default async function MyOrders() {
  const session = await getServerSession(authOptions);
  return <div>MyOrders: {JSON.stringify(session)}</div>;
}

import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';

import { FcLike } from 'react-icons/fc';
import { RiSearchEyeFill } from 'react-icons/ri';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import Avatar from '../../public/Avatar.jpg';
import { authOptions } from '@/app/api/lib/auth-options';
import { IOrder } from '@/app/(cart)/order-invoice/get-order';

export interface IUser {
  email: string;
  Order: IOrder[];
}

export default async function ListItem() {
  const {
    user: { email },
  } = (await getServerSession(authOptions)) as { user: IUser };

  return (
    <ul className="max-w-md divide-y divide-gray-800 bg-gray-900 rounded-[30px]">
      <li className="mb-4 p-3 rounded-[30px] bg-slate-700 hover:bg-slate-500">
        <Link className="flex items-center space-x-4" href="/account">
          <div className="flex-shrink-0">
            <Image
              className="w-10 h-10 rounded-full object-cover"
              src={Avatar}
              width={400}
              height={400}
              alt="Profile Image"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Bar Snickers</p>
            <p className="text-sm text-gray-400 text-ellipsis overflow-hidden">
              {email}
            </p>
          </div>
        </Link>
      </li>
      <li className="mb-4 p-3 rounded-[30px] hover:bg-slate-700">
        <Link className="flex items-center space-x-4" href="/account/my-orders">
          <div className="flex-shrink-0">
            <BsFillMenuButtonWideFill size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-x font-medium text-white">My orders</p>
          </div>
        </Link>
      </li>
      <li className="mb-4 p-3 rounded-[30px] hover:bg-slate-700">
        <Link
          className="flex items-center space-x-4"
          href="/account/last-views"
        >
          <div className="flex-shrink-0">
            <RiSearchEyeFill size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-x font-medium text-white">Last views</p>
          </div>
        </Link>
      </li>
      <li className="mb-4 p-3 rounded-[30px] hover:bg-slate-700">
        <Link className="flex items-center space-x-4" href="/account/liked">
          <div className="flex-shrink-0">
            <FcLike size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-x font-medium truncate text-white">Likes</p>
          </div>
        </Link>
      </li>
    </ul>
  );
}

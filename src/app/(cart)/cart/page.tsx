import dynamic from 'next/dynamic';

import { RiSecurePaymentLine } from 'react-icons/ri';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';

import { Button, Spinner } from '@/components';

const ItemWrapper = dynamic(() => import('./item-wrapper'), {
  ssr: false,
  loading: () => <Spinner />,
});
const PriceWrapper = dynamic(() => import('./price-wrapper'), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function Cart() {
  return (
    <div className="max-w-7xl mx-auto p-6 w-full grid grid-cols-3 gap-4 text-black dark:text-white">
      <div className="col-span-2">
        <h1 className="text-black dark:text-white">My Cart</h1>
        <hr className="mt-4 mb-3 border-gray-700" />
        <ItemWrapper />
        <hr className="mt-4 mb-6 border-gray-700" />
      </div>
      <div>
        <h1 className="text-black dark:text-white">Order summary</h1>
        <hr className="mt-4 mb-6 border-gray-700" />
        <div className="flex justify-between mt-2">
          <p className="text-black dark:text-white">Cost Delivery:</p>
          <p className="text-black dark:text-white">FREE</p>
        </div>
        <hr className="mt-4 mb-6 border-gray-700" />
        <PriceWrapper label="Total:" />
        <Button
          color="warning"
          fullWidth
          leftIcon={<MdOutlineShoppingCartCheckout size={25} />}
        >
          Buy
        </Button>
        <p className="flex items-center justify-center text-sm mt-2 text-black dark:text-white">
          <RiSecurePaymentLine
            className="text-black dark:text-white mr-2"
            size={25}
          />
          Secure Checkout
        </p>
      </div>
    </div>
  );
}

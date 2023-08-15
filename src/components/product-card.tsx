import Link from 'next/link';
import Image from 'next/image';
import { Button } from '.';

export type CardProps = {
  name: string;
  describe: string;
  price: number;
  slug: string;
  preview?: string;
  addToCart?: (data: CardProps) => void;
};

export default function ProductCard({
  name,
  describe,
  price,
  slug,
  preview = undefined,
  addToCart = () => {},
}: CardProps) {
  return (
    <div className="group flex flex-col h-full shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
        <Image
          className="w-full h-full rounded-t-xl object-cover"
          src={
            preview !== undefined
              ? preview
              : 'https://i0.wp.com/cid.center/wp-content/uploads/2020/11/placeholder.png?ssl=1'
          }
          width={100}
          height={100}
          alt={name + describe}
        />
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
          {name}
        </h3>
        <p className="block mb-1 text-xl font-semibold text-blue-600 dark:text-blue-500">
          Price: {price}$
        </p>
        <p className="mt-3 text-gray-500">{describe}</p>
      </div>
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
        <Link
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-bl-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
          href={'/product-info/' + slug}
        >
          Info
        </Link>
        <Button
          fullWidth
          variant="ghost"
          color="blackedOpacity"
          onClick={() => addToCart({ name, describe, price, slug, preview })}
        >
          Buy
        </Button>
      </div>
    </div>
  );
}

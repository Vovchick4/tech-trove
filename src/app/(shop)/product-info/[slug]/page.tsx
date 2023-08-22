import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { Spinner } from '@/components';
import Gallery from '@/components/image-gallery';
import { ICardProps } from '@/components/product-card';

const AddToCard = dynamic(() => import('./add-to-card'), {
  ssr: false,
  loading: () => <Spinner />,
});

async function getData(slug: string) {
  const dataFromCache = (
    await (
      await fetch(`${process.env.API_URL}/api/products/${slug}`, {
        cache: 'no-cache',
      })
    ).json()
  ).product;

  return dataFromCache as ICardProps;
}

export default async function ProductInfo({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const product = await getData(slug);

  if (!product && !slug) {
    notFound();
  }

  const { name, price, describe } = product;

  return (
    <div className="flex flex-col min-h-screen m-6 p-8 rounded-[30px] bg-slate-700">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-center">
          <Gallery />
        </div>

        <div className="flex flex-col justify-start">
          <div className="p-4 md:p-6">
            <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
              {name}
            </h3>
            <p className="block mb-1 text-xl font-semibold text-blue-600 dark:text-blue-500">
              Price: {price}$
            </p>
          </div>
          <AddToCard {...product} />
          <div className="m-2 p-4 rounded-[30px] bg-slate-800">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-600 dark:hover:text-white">
              About
            </h3>
            <p className="text-gray-400">{describe}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

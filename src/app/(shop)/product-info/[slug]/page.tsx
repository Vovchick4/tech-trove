import { notFound } from 'next/navigation';
import { Button } from '@/components';
import setToCache from '@/app/lib/cache';
import { CardProps } from '@/components/product-card';
import Gallery from '@/components/image-gallery';

async function getData(slug: string) {
  const dataFromCache = await setToCache(
    slug,
    async () =>
      await (
        await fetch(`http://localhost:3000/api/products?slug=${slug}`, {
          cache: 'no-cache',
        })
      ).json()
  );

  return dataFromCache;
}

export default async function ProductInfo({
  // name,
  // describe,
  // price,
  // slug,
  // preview = undefined,
  // addToCart = () => {},
  params: { slug },
}: {
  params: { slug: string };
}) {
  const findProduct = await getData(slug);

  if (findProduct === null) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen m-6 p-8 rounded-[30px] bg-slate-700">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-center">
          <Gallery />
        </div>

        <div className="flex flex-col justify-start">
          <div className="p-4 md:p-6">
            <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
              {slug}
              {/* {name} */}
            </h3>
            <p className="block mb-1 text-xl font-semibold text-blue-600 dark:text-blue-500">
              Price: 300 {/* price */}$
            </p>
            <div className="m-3 ">
              <Button
                roundedFull
                fullWidth
                variant="outline"
                color="info"
                // onClick={() =>
                //   addToCart({ name, describe, price, slug, preview })
                // }
              >
                Add to Card
              </Button>
            </div>
          </div>
          <div className="m-2 p-4 rounded-[30px] bg-slate-800">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-600 dark:hover:text-white">
              About
            </h3>
            <p className="text-gray-400">
              • Модель процесора: Intel 8-Core i7-10700F 2.9-4.8GHz ; •
              Відеокарта: GeForce RTX 3070 8GB ; • Оперативна пам'ять: 32GB
              DDR4-3200 Gaming ; • Об'єм накопичувача: 1TB NVMe SSD ; • Об'єм
              другого накопичувача: – ; • Охолодження процесора: Enermax T40 ; •
              Чіпсет мат. плати: Intel® B460 ; • Модель материнської плати:
              PRIME B460M-A ; • Корпус: QUBE BREEZE ARGB ; • Блок живлення: 700W
              80+ Bronze ; • Операційна система: No OS ; {/* describe */}
            </p>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   ProductInfo {slug}
    //   <br />
    //   {JSON.stringify(findProduct)}
    //   <br />
    //   <Button type="button" color="danger" size="default" variant="solid">
    //     Solid btn
    //   </Button>
    //   <Button type="button" color="danger" size="default" variant="outline">
    //     Outline btn
    //   </Button>
    //   <Button type="button" color="warning" size="default" variant="ghost">
    //     Ghost btn
    //   </Button>
    //   <Button type="button" color="danger" size="default" variant="soft">
    //     Soft btn
    //   </Button>
    // </div>
  );
}

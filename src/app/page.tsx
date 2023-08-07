import Link from 'next/link';
import Image from 'next/image';

import { Carusel } from '@/components';

import PCImage from '../../public/PC-image-category.jpg';
import ConsoleImage from '../../public/Console-image-category.jpg';
import AccessoriesImage from '../../public/Accessories-image-category.jpg';
import ControllersImage from '../../public/Controllers-image-category.jpg';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-8 max-w-7xl mx-auto">
      <div className="rounded-[30px] bg-slate-700 p-12">
        <div>
          <h1 className="font-bold text-3xl py-6">Shop by category</h1>
        </div>

        <div className=" flex flex-wrap justify-center flex-row p-4 w-full h-full gap-4">
          <div className="flex justify-center w-300 min-w-250">
            <Link
              className="group relative flex flex-col items-center overflow-hidden rounded-[30px] bg-black/100 transition-all"
              href={'/'}
            >
              <Image
                className="rounded-[30px] h-full transition-all opacity-75 object-cover hover:opacity-25 hover:scale-125"
                width={250}
                height={300}
                src={ConsoleImage}
                alt={'ImageConsole'}
              />
              <div className="absolute bottom-2 text-lg pointer-events-none">
                <p className="font-bold text-lg transition-all">Console</p>
              </div>
            </Link>
          </div>

          <div className="flex justify-center w-300 min-w-250">
            <Link
              className="group relative flex flex-col items-center overflow-hidden rounded-[30px] bg-black/100 transition-all"
              href={'/'}
            >
              <Image
                className="rounded-[30px] h-full transition-all opacity-75 object-cover hover:opacity-25 hover:scale-125"
                width={250}
                height={300}
                src={PCImage}
                alt={'ImageConsole'}
              />
              <div className="absolute bottom-2 text-lg pointer-events-none">
                <p className="font-bold text-lg transition-all">PC</p>
              </div>
            </Link>
          </div>

          <div className="flex justify-center w-300 min-w-250">
            <Link
              className="group relative flex flex-col items-center overflow-hidden rounded-[30px] bg-black/100 transition-all"
              href={'/'}
            >
              <Image
                className="rounded-[30px] h-full transition-all opacity-75 object-cover hover:opacity-25 hover:scale-125"
                width={250}
                height={300}
                src={AccessoriesImage}
                alt={'ImageConsole'}
              />
              <div className="absolute bottom-2 text-lg pointer-events-none">
                <p className="font-bold text-lg transition-all">Accessories</p>
              </div>
            </Link>
          </div>

          <div className="flex justify-center w-300 min-w-250">
            <Link
              className="group relative flex flex-col items-center overflow-hidden rounded-[30px] bg-black/100 transition-all"
              href={'/'}
            >
              <Image
                className="rounded-[30px] h-full transition-all opacity-75 object-cover hover:opacity-25 hover:scale-125"
                width={250}
                height={300}
                src={ControllersImage}
                alt={'ImageConsole'}
              />
              <div className="absolute bottom-2 text-lg pointer-events-none">
                <p className="font-bold text-lg transition-all">Controllers</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 ">
        <div>
          <h1 className="font-bold text-3xl py-6">Best sales</h1>
        </div>

        <Carusel />
      </div>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 ">
        <div>
          <h1 className="font-bold text-3xl py-6">Hot discounts</h1>
        </div>

        <Carusel />
      </div>
    </main>
  );
}
